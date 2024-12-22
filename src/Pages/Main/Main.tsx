import React, { useState, useEffect } from "react";
import { Button, Container, Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { ChangeBgImage } from "../../components/ChangeBgImage/ChangeBgImage";
import { Header } from "../../components/Header";
import { Movie } from "../../components/Movie";
import { IFilm, IHall, ISeance } from "../../models";

import "../../styles/_main.scss";

export const Main: React.FC = () => {
  const [dates, setDates] = useState<Date[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [films, setFilms] = useState<IFilm[]>([]);
  const [halls, setHalls] = useState<IHall[]>([]);
  const [seances, setSeances] = useState<ISeance[]>([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { transferIn, transferOut, logout } = useAuth();

  useEffect(() => {
    transferOut();
    logout();
    // Генерация дат (7 дней начиная с текущей)
    const today = new Date();
    const generatedDates = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(today.getDate() + i);
      return date;
    });
    setDates(generatedDates);

    // Установка текущей даты по умолчанию
    const todayString = today.toISOString().split("T")[0];
    setSelectedDate(todayString);
    fetchMovies();
  }, [transferOut, logout]);

  const fetchMovies = async () => {
    setLoading(true);
    try {
      await fetch("https://shfe-diplom.neto-server.ru/alldata", {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => {
          setFilms(data.result.films);
          setHalls(data.result.halls);
          setSeances(data.result.seances);
        });
    } catch (e) {
      console.error("Ошибка загрузки фильмов", e);
    } finally {
      setLoading(false);
    }
  };

  const handleDateClick = (date: Date): void => {
    const dateString = date.toISOString().split("T")[0]; // Формат yyyy-mm-dd
    setSelectedDate(dateString);
    fetchMovies();
  };

  const handleNextDate = () => {
    if (dates.length && selectedDate) {
      const currentIndex = dates.findIndex(
        (d) => d.toISOString().split("T")[0] === selectedDate
      );
      const nextIndex = (currentIndex + 1) % dates.length; // Цикличный переход
      handleDateClick(dates[nextIndex]);
    }
  };

  const handleLogin = () => {
    transferIn();
    navigate("/login");
  };

  return (
    <ChangeBgImage>
      <Container className="main p-0">
        <Stack direction="horizontal" className="main__header">
          <div className="main__header-title">
            <Header />
          </div>
          <div className="main__header-button ms-auto ">
            <Button variant="secondary" onClick={handleLogin}>
              Войти
            </Button>
          </div>
        </Stack>
        <Stack direction="horizontal" className="main__nav-date-container">
          {dates.map((date, index) => {
            const dateString = date.toISOString().split("T")[0];
            const isSelected = dateString === selectedDate;
            const isWeekend = date.getDay() === 0 || date.getDay() === 6; // Проверка на выходные

            const changeSize = isSelected
              ? "main__nav-date-active"
              : "main__nav-date";

            return (
              <div
                key={dateString}
                className={`md="auto" ${changeSize}`}
                onClick={() => handleDateClick(date)}
                style={{
                  color: isWeekend ? "red" : "black", // Выделение выходных красным цветом
                }}
              >
                <div>
                  {index === 0
                    ? "Сегодня"
                    : `${date.toLocaleDateString("ru-RU", {
                        weekday: "short",
                      })},`}
                </div>
                <div>
                  {index === 0
                    ? `${date.toLocaleDateString("ru-RU", {
                        weekday: "short",
                      })}, ${date.getDate()}`
                    : `${date.getDate()}`}
                </div>
              </div>
            );
          })}
          <button
            className={`md="auto" main__nav-date-button`}
            onClick={handleNextDate}
          >
            {">"}
          </button>
        </Stack>
        <Stack>
          {loading ? (
            <div style={{ marginTop: "40px" }}>Загрузка...</div>
          ) : (
            <div style={{ marginTop: "40px" }}>
              {films.length > 0 ? (
                <Movie films={films} halls={halls} seances={seances} selectedDate={selectedDate}/>
              ) : (
                <div>Фильмы не найдены</div>
              )}
            </div>
          )}
        </Stack>
      </Container>
    </ChangeBgImage>
  );
};

{
  /* <div style={{ marginTop: "20px" }}>
{movies.length > 0 ? (
  movies.map((movie) => <Movie key={movie.id} movie={movie} hall={hall} />)
) : (
  <div>Фильмы не найдены</div>
)}
</div> */
}

/* <Movie key={movie.id} movie={movie}  /> */
// p-0 col-sm-12 col-md-7 col-lg-7 col-xl-7
// <div className="main">
//   <div className="main__header">
//     <Header />
//     <div className="main__header-button">
//       <Button variant="primary" onClick={handleLogin}>
//         Войти
//       </Button>
//       <button onClick={handleLogin}>Войти</button>
//     </div>
//   </div>
// </div>

// <Container fluid className="p-0">
//           <Row className="main__container-nav-date flex-nowrap">
//             {dates.map((date, index) => {
//               const dateString = date.toISOString().split("T")[0];
//               const isSelected = dateString === selectedDate;
//               const isWeekend = date.getDay() === 0 || date.getDay() === 6; // Проверка на выходные

//               const changeSize = isSelected
//                 ? "main__nav-date-active"
//                 : "main__nav-date";

//               return (
//                 <Col key={dateString} className="p-0">
//                   <div
//                     className={`p-2 align-content-center ${changeSize}`}
//                     onClick={() => handleDateClick(date)}
//                     style={{
//                       color: isWeekend ? "red" : "black", // Выделение выходных красным цветом
//                     }}
//                   >
//                     <div>
//                       {index === 0
//                         ? "Сегодня"
//                         : `${date.toLocaleDateString("ru-RU", {
//                             weekday: "short",
//                           })},`}
//                     </div>
//                     <div>
//                       {index === 0
//                         ? `${date.toLocaleDateString("ru-RU", {
//                             weekday: "short",
//                           })}, ${date.getDate()}`
//                         : `${date.getDate()}`}
//                     </div>
//                   </div>
//                 </Col>
//               );
//             })}
//             <Col className="p-0">
//               <button
//                 className="w-100 main__nav-date-button"
//                 onClick={handleNextDate}
//               >
//                 {">"}
//               </button>
//             </Col>
//           </Row>
//         </Container>
