import { useEffect, useState } from "react";
import { Container, Stack } from "react-bootstrap";
import { Header } from "../../components/Header";
import { ChangeBgImage } from "../../components/ChangeBgImage/ChangeBgImage";
import { HallManagement } from "../../components/AdminPage";
import { CreateHallModal } from "../../components/CreateHallModal";
import { IHall } from "../../models";
// import { HallConfig } from "../../components/HallConfig";
import "../../styles/_adminPage.scss";

export const AdminPage = () => {
  // const [films, setFilms] = useState<IFilm[]>([]);
  const [halls, setHalls] = useState<IHall[]>([]);
  // const [seances, setSeances] = useState<ISeance[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeHall, setActiveHall] = useState<IHall | null>(null);
  const [sectionStates, setSectionStates] = useState([
    { id: "hallManagment", isOpen: true },
    { id: "hallConfig", isOpen: true },
  ]);

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
            if (data.result.halls.length > 0) {
              setActiveHall(data.result.halls[0]);
            }
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

  const handleConfigureHall = (hall: IHall) => {
    setActiveHall(hall);
  };

  // const handleHallUpdated = (updatedHall: IHall) => {
  //   setHalls((prevHalls) =>
  //     prevHalls.map((hall) => (hall.id === updatedHall.id ? updatedHall : hall))
  //   );
  //   setActiveHall(updatedHall);
  // };

  const toggleSection = (id: string) => {
    setSectionStates((prevStates) =>
      prevStates.map((section) =>
        section.id === id ? { ...section, isOpen: !section.isOpen } : section
      )
    );
  };

  const isSectionOpen = (id: string) =>
    sectionStates.find((section) => section.id === id)?.isOpen;

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
                  isSectionOpen("hallManagment") ? "" : "rotated"
                }`}
                onClick={() => toggleSection("hallManagment")}
              ></div>
            </div>
          </header>
          <section
            className={`admin-section__body ${
              isSectionOpen("hallManagment") ? "" : "admin-section__hidden"
            }`}
          >
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
            <button
              className="admin-section__btn"
              onClick={() => setIsModalOpen(true)}
            >
              Cоздать зал
            </button>
          </section>
        </Stack>
        <Stack className="admin-section__container">
          <header className="admin-section__header admin-section__header-both">
            <div className="admin-section__header-container">
              <div className="admin-section__header-tittle">
                Конфигурация залов
              </div>
              <div
                className={`admin-section__header-close-button ${
                  isSectionOpen("hallConfig") ? "" : "rotated"
                }`}
                onClick={() => toggleSection("hallConfig")}
              ></div>
            </div>
          </header>
          <section
            className={`admin-section__body ${
              isSectionOpen("hallConfig") ? "" : "admin-section__hidden"
            }`}
          >
            <div className="">
              <div>Выберите зал для конфигурации:</div>
              <div className="d-flex">
                {halls.map((hall) => (
                  <div key={hall.id} className="">
                    <button
                      onClick={() => handleConfigureHall(hall)}
                      className={`admin-section__hall-button ${
                        activeHall?.id === hall.id ? "active" : ""
                      }`}
                    >
                      {hall.hall_name}
                    </button>
                  </div>
                ))}
              </div>
              {/* {activeHall ? (
                <HallConfig
                  hallId={activeHall.id}
                  initialRows={activeHall.hall_rows}
                  initialPlaces={activeHall.hall_places}
                  initialConfig={activeHall.hall_config}
                  onSave={handleHallUpdated}
                />
              ) : (
                halls.length > 0 && <div>Выберите зал для конфигурации</div>
              )} */}
            </div>
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
