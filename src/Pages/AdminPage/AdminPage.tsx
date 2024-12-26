import { useEffect, useState } from "react";
import { Container, Stack } from "react-bootstrap";
import { Header } from "../../components/Header";
import { ChangeBgImage } from "../../components/ChangeBgImage/ChangeBgImage";
import { HallManagement } from "../../components/AdminPage";
import { CreateHallModal } from "../../components/CreateHallModal";
import { IHall } from "../../models";
import "../../styles/_adminPage.scss";

export const AdminPage = () => {
  // const [films, setFilms] = useState<IFilm[]>([]);
  const [halls, setHalls] = useState<IHall[]>([]);
  // const [seances, setSeances] = useState<ISeance[]>([]);
  const [isClose, setIsClose] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closed = isClose ? "admin-section__hidden" : "";

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        await fetch("https://shfe-diplom.neto-server.ru/alldata", {
          method: "GET",
        })
          .then((response) => response.json())
          .then((data) => {
            // setFilms(data.result.films);
            setHalls(data.result.halls);
            // setSeances(data.result.seances);
          });
      } catch (e) {
        console.error("Ошибка загрузки данных", e);
      }
    };

    fetchAllData();
  }, []);

  const handleDeleteHall = async (id: number) => {
    try {
      await fetch(`https://shfe-diplom.neto-server.ru/hall/${id}`, {
        method: "DELETE",
      });
      setHalls((prevHalls) => prevHalls.filter((hall) => hall.id !== id));
    } catch (e) {
      console.error("Ошибка при удалении зала", e);
    }
  };

  const handleHallCreated = (updatedHalls: IHall[]) => {
    setHalls(updatedHalls);
  };

  const handleClose = () => {
    setIsClose(!isClose);
  };

  return (
    <ChangeBgImage>
      <Container className="admin-page__container">
        <div className="admin-page__header">
          <Header />
        </div>
        <Stack className="admin-section__container">
          <header className="admin-section__header">
            <div className="admin-section__header-container">
              <div className="admin-section__header-tittle">
                Управление залами
              </div>
              <div
                className={`admin-section__header-close-button ${
                  isClose ? "rotated" : ""
                }`}
                onClick={handleClose}
              ></div>
            </div>
          </header>
          <section className={`admin-section__body ${closed}`}>
            <div>Доступные залы:</div>
            <div className="admin-section__hallSet">
              {halls.map((hall) => {
                if (halls.length === 0) return null;
                return (
                  <HallManagement
                    key={hall.id}
                    hall={hall}
                    onDelete={handleDeleteHall}
                  />
                );
              })}
            </div>
            <button onClick={() => setIsModalOpen(true)}>Cоздать зал</button>
          </section>
        </Stack>
      </Container>
      {isModalOpen && (
        <CreateHallModal
          onClose={() => setIsModalOpen(false)}
          onHallCreated={handleHallCreated}
        />
      )}
    </ChangeBgImage>
  );
};
