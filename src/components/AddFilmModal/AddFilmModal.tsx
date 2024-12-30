import { useState } from "react";
import { Notification } from "../../hooks/Notification";
import { IFilm } from "../../models";
import "../../styles/_createHallModal.scss";

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
    <div className="modal__overlay">
      <div className="modal__content">
        <header className="modal__header">
          <h2>Добавление Фильма</h2>
          <div className="modal__close" onClick={onClose}></div>
        </header>
        <form onSubmit={handleSubmit} className="modal__form">
          <div className="w-100">
            <label htmlFor="filmName">Название фильма</label>
            <input
              id="filmName"
              name="name"
              placeholder="Название фильма"
              onChange={handleChange}
              required
            />
          </div>
          <div className="w-100">
            <label htmlFor="filmTime">Продолжительность фильма (мин.)</label>
            <input
              id="filmTime"
              name="duration"
              type="number"
              inputMode="numeric"
              min={1}
              placeholder="Продолжительность фильма (мин.)"
              value={form.duration}
              onChange={handleChange}
              onBlur={(e) => {
                const value = parseInt(e.target.value, 10);
                if (isNaN(value) || value < 1) {
                  setForm((prev) => ({ ...prev, duration: "1" }));
                }
              }}
              required
            />
          </div>
          <div className="w-100">
            <label htmlFor="filTittle">Описание фильма</label>
            <textarea
              id="filTittle"
              name="description"
              placeholder="Описание фильма"
              onChange={handleChange}
              required
            />
          </div>
          <div className="w-100">
            <label htmlFor="filmCountry">Страна</label>
            <input
              id="filmCountry"
              name="origin"
              placeholder="Страна"
              onChange={handleChange}
              required
            />
          </div>

          <div className="modal__actions">
            <button
              type="submit"
              className="btn-box btn__primary"
              disabled={isSubmitting}
            >
              Добавить Фильм
            </button>
            <label htmlFor="filmPoster" className="btn-box btn__upload">
              Загрузить постер
            </label>
            <input
              id="filmPoster"
              type="file"
              className="hidden-input"
              onChange={handleFileChange}
              required
            />
            <button
              type="button"
              className="btn-box btn__secondary"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Отменить
            </button>
          </div>
        </form>
      </div>

      {isNotificationVisible && (
        <Notification
          message="Данные успешно сохранены!"
          onClose={() => setIsNotificationVisible(false)}
        />
      )}
    </div>
  );
};
