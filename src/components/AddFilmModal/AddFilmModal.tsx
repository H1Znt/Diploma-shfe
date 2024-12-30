import { useState } from "react";
import { Notification } from "../../hooks/Notification";
import { IFilm } from "../../models";

interface AddFilmModalProps {
  onClose: () => void;
  onFilmAdded: (updatedFilms: IFilm[]) => void;
}

export const AddFilmModal: React.FC<AddFilmModalProps> = ({
  onClose,
  onFilmAdded,
}) => {
  const [form, setForm] = useState({
    name: "",
    duration: "",
    description: "",
    origin: "",
    poster: null as File | null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setForm((prev) => ({ ...prev, poster: file }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    const params = new FormData();
    params.set("filmName", form.name);
    params.set("filmDuration", form.duration);
    params.set("filmDescription", form.description);
    params.set("filmOrigin", form.origin);
    if (form.poster) params.set("filePoster", form.poster);

    try {
      const response = await fetch("https://shfe-diplom.neto-server.ru/film", {
        method: "POST",
        body: params,
      });
      const data = await response.json();
      onFilmAdded(data.films);
      onClose();
      setIsNotificationVisible(true);
    } catch (error) {
      console.error("Ошибка добавления фильма:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Название" onChange={handleChange} />
        <input
          name="duration"
          type="number"
          placeholder="Длительность"
          onChange={handleChange}
        />
        <textarea
          name="description"
          placeholder="Описание"
          onChange={handleChange}
        />
        <input name="origin" placeholder="Страна" onChange={handleChange} />
        <input type="file" onChange={handleFileChange} />
        <button type="submit" disabled={isSubmitting}>
          Добавить
        </button>
        <button type="button" onClick={onClose} disabled={isSubmitting}>
          Отменить
        </button>
      </form>
      {isNotificationVisible && (
        <Notification
          message="Данные успешно сохранены!"
          onClose={() => setIsNotificationVisible(false)}
        />
      )}
    </div>
  );
};
