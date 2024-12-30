import { useEffect, useState } from "react";
import { Notification } from "../../hooks/Notification";
import { IHall } from "../../models";
import "../../styles/_openSales.scss"

type openSalesProps = {
  hallData: IHall;
  onSave: (updatedHallData: IHall) => void;
};

export const OpenSales: React.FC<openSalesProps> = ({ hallData, onSave }) => {
  const [isHallOpen, setIsHallOpen] = useState(hallData.hall_open);
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);

  useEffect(() => {
    setIsHallOpen(hallData.hall_open);
  }, [hallData]);

  const handleSave = () => {
    
    const changingTheOpening = isHallOpen === 1 ? 0 : 1

    const updatedHallData: IHall = {
      ...hallData,
      hall_open: changingTheOpening,
    };

    const params = new FormData();
    params.set("hallOpen", changingTheOpening.toString());

    fetch(`https://shfe-diplom.neto-server.ru/open/${hallData.id}`, {
      method: "POST",
      body: params,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        onSave(updatedHallData);
        setIsNotificationVisible(true);
      })
      .catch((error) =>
        console.error("Ошибка сохранения конфигурации: ", error)
      );
  };

  return (
    <div className="open-sales">
      <div className="open-sales__tittle">
        Зал: {isHallOpen ? "Открыт" : "Закрыт"}
      </div>
      {isHallOpen ? (
        <div className="open-sales__actions">
          <button onClick={handleSave}>ЗАКРЫТЬ ПРОДАЖУ БИЛЕТОВ</button>
        </div>
      ) : (
        <div className="open-sales__actions">
          <button onClick={handleSave}>ОТКРЫТЬ ПРОДАЖУ БИЛЕТОВ</button>
        </div>
      )}
      {isNotificationVisible && (
        <Notification
          message="Данные успешно сохранены!"
          onClose={() => setIsNotificationVisible(false)}
        />
      )}
    </div>
  );
};
