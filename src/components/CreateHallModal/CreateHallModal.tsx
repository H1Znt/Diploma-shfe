import { useState } from "react";
import { IHall } from "../../models";
import "../../styles/_createHallModal.scss";

interface CreateHallModalProps {
  onClose: () => void;
  onHallCreated: (updatedHalls: IHall[]) => void;
}

export const CreateHallModal: React.FC<CreateHallModalProps> = ({
  onClose,
  onHallCreated,
}) => {
  const [hallName, setHallName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);

    const params = new FormData();
    params.set("hallName", hallName);

    try {
      const response = await fetch("https://shfe-diplom.neto-server.ru/hall", {
        method: "POST",
        body: params,
      });
      const data = await response.json();

      if (data.success && data.result?.halls) {
        onHallCreated(data.result.halls); 
        onClose(); 
      } else {
        console.error("Ошибка создания зала:", data.message);
      }
    } catch (error) {
      console.error("Ошибка сети при создании зала:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal__overlay">
      <div className="modal__content">
        <header className="modal__header">
          <h2>Добавление зала</h2>
          <div className="modal__close" onClick={onClose}></div>
        </header>
        <form onSubmit={handleSubmit} className="modal__form">
          <label htmlFor="hallName">Название зала</label>
          <input
            id="hallName"
            type="text"
            value={hallName}
            onChange={(e) => setHallName(e.target.value)}
            placeholder="Название зала"
            required
          />
          <div className="modal__actions">
            <button
              type="submit"
              className="btn btn__primary"
              disabled={isSubmitting}
            >
              Добавить
            </button>
            <button
              type="button"
              className="btn btn__secondary"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Отменить
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
