import { useEffect, useState, type FormEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { DoorCard } from "../components/DoorCard";
import { DoorUnlockModal } from "../components/Modals";
import { doors } from "../data/doors";
import { createTransaction } from "../services/CentralbankApi";
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

  const handleDoorClick = (doorId: number): void => {
    const door = doors.find((item) => item.id === doorId);

    if (door && unlockedDifficulties.includes(door.difficulty)) {
      window.parent.postMessage({ type: "AMUSEMENT_CLOSE" }, "*");
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

      window.sessionStorage.setItem(
        "transactionId",
        String(transaction.transaction_id),
      );
      if (transaction.stamp) {
        window.sessionStorage.setItem("stamp", transaction.stamp.image_url);
      } else {
        window.sessionStorage.removeItem("stamp");
      }

      setSelectedDoor(null);
      setValidationMessage("");

      navigate(`/riddle/${door.difficulty}`);
    } catch (error: unknown) {
      const apiErr = error as { message?: string; status?: number };
      if (apiErr?.message) {
        setValidationMessage(apiErr.message);
      } else {
        setValidationMessage("Payment failed. Please return to Tivoli.");
      }
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
