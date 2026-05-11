import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { DoorCard } from "../components/DoorCard";
import { DoorUnlockModal } from "../components/DoorUnlockModal.tsx";
import { doors } from "../data/doors";
import { validateTransferCode } from "../services/CentralbankApi";
import "./DashBoardPage.css";

export function DashboardPage() {
  const [selectedDoor, setSelectedDoor] = useState<number | null>(null);
  const [transferCode, setTransferCode] = useState("");
  const [validationMessage, setValidationMessage] = useState("");
  const navigate = useNavigate();

  const handleDoorClick = (doorId: number) => {
    setSelectedDoor(doorId);
    setTransferCode("");
    setValidationMessage("");

    console.log("Selected door:", doorId);
  };

  const handleCloseModal = () => {
    setSelectedDoor(null);
    setTransferCode("");
    setValidationMessage("");
  };

  const handleSubmitTransferCode = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (selectedDoor === null) {
      return;
    }

    const door = doors.find((item) => item.id === selectedDoor);

    if (!door) {
      setValidationMessage("We could not find the selected door.");
      return;
    }

    const result = await validateTransferCode(transferCode, door.cost);
    setValidationMessage(result.message);

    if (result.ok) {
      setSelectedDoor(null);
      setTransferCode("");
      navigate(`/riddle/${door.difficulty}`);
    }
  };

  return (
    <main>
      <section className="door-grid">
            <section className="dashboard-intro">
              <h1>Choose your fate</h1>
              <p>
              The gates are heavy, and the secrets are many. Step through, if you dare to lose your way
              </p>
            </section>

            <section className="centralbank-info">
              <h2>Centralbank</h2>
              <p>
                Every door has its price, follow
                the link to the centralbank and
                take out the amount you need:
              </p>
            </section>

        {doors.map((door) => (
          <DoorCard
            key={door.id}
            door={door}
            onClick={() => handleDoorClick(door.id)}
          />
        ))}
      </section>

      {selectedDoor !== null && (
        <DoorUnlockModal
          door={doors.find((door) => door.id === selectedDoor) ?? doors[0]}
          transferCode={transferCode}
          validationMessage={validationMessage}
          onClose={handleCloseModal}
          onSubmit={handleSubmitTransferCode}
          onTransferCodeChange={setTransferCode}
        />
      )}
    </main>
  );
}