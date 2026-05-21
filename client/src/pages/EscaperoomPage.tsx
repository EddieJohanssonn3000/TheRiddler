import { useEffect, useState, type FormEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { DoorCard } from "../components/DoorCard";
import { DoorUnlockModal } from "../components/Modals";
import { doors } from "../data/doors";
import {
  createTransaction,
  createPayout,
  type ApiError,
} from "../services/CentralbankApi";
import { getIdentityToken } from "../utils/identityToken";
import type { Difficulty } from "../types";
import "./EscaperoomPage.css";

function EscaperoomPage() {
  const [selectedDoor, setSelectedDoor] = useState<number | null>(null);
  const [validationMessage, setValidationMessage] = useState("");
  const [unlockedDifficulties, setUnlockedDifficulties] = useState<
    Difficulty[]
  >(() => {
    const stored = window.sessionStorage.getItem("unlockedDifficulties");
    return stored ? JSON.parse(stored) : [];
  });

  const navigate = useNavigate();
  const location = useLocation();
  const [payoutMessage, setPayoutMessage] = useState<string | null>(null);

  useEffect(() => {
    window.sessionStorage.setItem(
      "unlockedDifficulties",
      JSON.stringify(unlockedDifficulties),
    );
  }, [unlockedDifficulties]);

  useEffect(() => {
    const state = location.state as { solvedDifficulty?: Difficulty } | null;
    const solvedDifficulty = state?.solvedDifficulty;

    if (!solvedDifficulty) {
      return;
    }

    setUnlockedDifficulties((current) => {
      if (current.includes(solvedDifficulty)) {
        return current;
      }

      return [...current, solvedDifficulty];
    });
  }, [location.state]);

  useEffect(() => {
    const payoutDone = window.sessionStorage.getItem("payoutDone") === "true";

    if (unlockedDifficulties.length === 3 && !payoutDone) {
      const txsRaw = window.sessionStorage.getItem("transactionIds");
      const txIds = txsRaw ? (JSON.parse(txsRaw) as string[]) : [];

      if (!txIds.length) {
        setPayoutMessage("No transaction found. Please return to Tivoli.");
        return;
      }

      const transactionId = txIds[0]; // use first payment for payout

      (async () => {
        try {
          await createPayout(transactionId, 5);
          window.sessionStorage.setItem("payoutDone", "true");
          setPayoutMessage("Congrats — you received €5 back!");
        } catch (err: unknown) {
          const apiErr = err as ApiError;
          if (apiErr?.status === 401) {
            setPayoutMessage("Session expired. Please return to Tivoli.");
          } else {
            setPayoutMessage("Payout failed. Please try again later.");
          }
        }
      })();
    }
  }, [unlockedDifficulties]);

  const handleDoorClick = (doorId: number): void => {
    const door = doors.find((item) => item.id === doorId);

    if (door && unlockedDifficulties.includes(door.difficulty)) {
      window.location.href = "https://frontend-main-1ac7.up.railway.app/";
      return;
    }

    setSelectedDoor(doorId);
    setValidationMessage("");
  };

  const handleCloseModal = (): void => {
    setSelectedDoor(null);
    setValidationMessage("");
  };

  const handleSubmitPayment = async (
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault();

    if (selectedDoor === null) {
      return;
    }

    const door = doors.find((item) => item.id === selectedDoor);

    if (!door) {
      setValidationMessage("We could not find the selected door.");
      return;
    }

    const identityToken = getIdentityToken();

    if (!identityToken) {
      setValidationMessage("No session found. Please return to Tivoli.");
      return;
    }

    try {
      const transaction = await createTransaction(identityToken, door.cost);

      // persist transaction ids and stamps as arrays so we keep history
      const existingTx = window.sessionStorage.getItem("transactionIds");
      const txIds = existingTx ? (JSON.parse(existingTx) as string[]) : [];
      txIds.push(transaction.id);
      window.sessionStorage.setItem("transactionIds", JSON.stringify(txIds));

      const existingStamps = window.sessionStorage.getItem("stamps");
      const stamps = existingStamps
        ? (JSON.parse(existingStamps) as string[])
        : [];
      stamps.push(transaction.stamp);
      window.sessionStorage.setItem("stamps", JSON.stringify(stamps));

      setSelectedDoor(null);
      setValidationMessage("");

      navigate(`/riddle/${door.difficulty}`);
    } catch (error) {
      setValidationMessage("Payment failed. Please return to Tivoli.");
    }
  };

  return (
    <main className="escaperoom-page">
      <section className="door-grid">
        {doors.map((door) => (
          <DoorCard
            key={door.id}
            door={door}
            isUnlocked={unlockedDifficulties.includes(door.difficulty)}
            onClick={() => handleDoorClick(door.id)}
          />
        ))}
      </section>

      {selectedDoor !== null && (
        <DoorUnlockModal
          door={doors.find((door) => door.id === selectedDoor) ?? doors[0]}
          validationMessage={validationMessage}
          onClose={handleCloseModal}
          onSubmit={handleSubmitPayment}
        />
      )}
    </main>
  );
}

export default EscaperoomPage;
