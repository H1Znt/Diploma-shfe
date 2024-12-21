import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { ISeance, IHall, IFilm } from "../../models/index";
import "../../styles/_movieSeance.scss";
import { ChangeBgImage } from "../ChangeBgImage";
import { Container, Stack } from "react-bootstrap";
import { Header } from "../Header";
import HintSvg from "../../assets/hint.svg";

export const MovieSeance: React.FC = () => {
  const { seanceId } = useParams<{ seanceId: string }>();
  const [seance, setSeance] = useState<ISeance | null>(null);
  const [film, setFilm] = useState<IFilm | null>(null);
  const [hall, setHall] = useState<IHall | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<number[][]>([]);
  const navigate = useNavigate();
  const location = useLocation();

  const { selectedDate } = location.state || {};

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://shfe-diplom.neto-server.ru/alldata"
        );
        const data = await response.json();
        console.log("Полученные данные:", data);

        const selectedSeance = data.result.seances.find(
          (s: ISeance) => s.id === parseInt(seanceId || "0")
        );

        console.log("Идентификатор сеанса:", seanceId);
        console.log("Найденный сеанс:", selectedSeance);

        if (!selectedSeance) {
          console.error("Сеанс не найден");
          return;
        }

        setSeance(selectedSeance);

        const selectedFilm = data.result.films.find(
          (f: IFilm) => f.id === selectedSeance.seance_filmid
        );

        console.log("Найденный фильм:", selectedFilm);

        if (!selectedFilm) {
          console.error("Фильм не найден");
          return;
        }

        setFilm(selectedFilm);

        const selectedHall = data.result.halls.find(
          (h: IHall) => h.id === selectedSeance.seance_hallid
        );

        console.log("Найденный зал:", selectedHall);

        if (!selectedHall) {
          console.error("Зал не найден");
          return;
        }

        setHall(selectedHall);
      } catch (error) {
        console.error("Ошибка загрузки данных:", error);
      }
    };

    fetchData();
  }, [seanceId]);

  if (!seance || !film || !hall) {
    return (
      <ChangeBgImage>
        <Container className="main p-0">
          <Stack direction="horizontal" className="main__header">
            <div className="main__header-title">
              <Header />
            </div>
          </Stack>
          <Stack>
            <div className="container ms-auto w-100 h-100 d-flex justify-content-center">
              <div className="p-9">Загрузка...</div>
            </div>
          </Stack>
        </Container>
      </ChangeBgImage>
    );
  }

  const seatConfig = hall.hall_config;

  const handleSeatClick = (row: number, col: number) => {
    const rowIndex = row + 1; // Переносим нумерацию на 1
    const colIndex = col + 1; // Переносим нумерацию на 1

    const isSelected = selectedSeats.some(
      ([r, c]) => r === rowIndex && c === colIndex
    );

    setSelectedSeats((prev) => {
      const updatedSeats = isSelected
        ? prev.filter(([r, c]) => r !== rowIndex || c !== colIndex)
        : [...prev, [rowIndex, colIndex]];

      // Сортировка мест по ряду и месту
      return updatedSeats.sort(([r1, c1], [r2, c2]) =>
        r1 === r2 ? c1 - c2 : r1 - r2
      );
    });
  };

  const handleBooking = () => {
    console.log(`Места: ${selectedSeats}`);
    navigate("/booking-summary", {
      state: {
        filmName: film.film_name,
        hallName: hall.hall_name,
        seanceTime: seance.seance_time,
        selectedSeats,
        seatPrices: {
          standart: hall.hall_price_standart,
          vip: hall.hall_price_vip,
        },
        selectedDate: selectedDate,
      },
    });
  };

  return (
    <ChangeBgImage>
      <Container className="seances__container p-0">
        <Stack direction="horizontal" className="main__header">
          <div className="main__header-title">
            <Header />
          </div>
        </Stack>
        <Stack className="seance">
          <div className="seance__tittle p-3 d-flex justify-content-between">
            <div>
              <h1>{film.film_name}</h1>
              <h2>Начало сеанса: {seance.seance_time}</h2>
              <h1>{hall.hall_name}</h1>
            </div>
            <div className="seance__tap d-flex align-items-center">
              <div>
                <img src={HintSvg} alt="Тап" />
              </div>
              <div className="seance__tap-tittle d-flex">
                Тапните дважды, чтобы увеличить
              </div>
            </div>
          </div>
          <div className="seance__places p-3 d-flex justify-content-center">
            <div className="seance__places-container ">
              <div className="w-100">
                <div className="seance__places-screen">Экран</div>
                <div className="seance__seats-grid">
                  {seatConfig.map((row, rowIndex) => (
                    <div key={rowIndex} className="seance__seats-row">
                      {row.map((col, colIndex) => {
                        const seatRow = rowIndex + 1; // Нумерация с 1
                        const seatCol = colIndex + 1; // Нумерация с 1

                        const isSelected = selectedSeats.some(
                          ([r, c]) => r === seatRow && c === seatCol
                        );
                        const isDisabled = col === "disabled";
                        const isVip = col === "vip";

                        return (
                          <button
                            key={`${rowIndex}-${colIndex}`}
                            className={`seance__seat ${
                              isDisabled
                                ? "disabled"
                                : isSelected
                                ? "selected"
                                : isVip
                                ? "vip"
                                : "standart"
                            }`}
                            onClick={() =>
                              !isDisabled && handleSeatClick(rowIndex, colIndex)
                            }
                            disabled={isDisabled}
                          ></button>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
              <div className="legend d-flex justify-content-center">
                <div className="gap">
                  <div className="legend-item">
                    <span className="box free"></span> Свободно (
                    {hall.hall_price_standart}руб)
                  </div>
                  <div className="legend-item">
                    <span className="box vip"></span> Свободно VIP (
                    {hall.hall_price_vip}руб)
                  </div>
                </div>
                <div className="gap">
                  <div className="legend-item">
                    <span className="box reserved"></span> Занято
                  </div>
                  <div className="legend-item">
                    <span className="box selected"></span> Выбрано
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="actions">
            <button
              className=""
              onClick={handleBooking}
              disabled={selectedSeats.length === 0}
            >
              Забронировать
            </button>
          </div>
        </Stack>
      </Container>
    </ChangeBgImage>
  );
};
