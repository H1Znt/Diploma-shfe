import { IHall } from "../../models";
import "../../styles/_hallManagment.scss";

interface IHallManagement {
  hall: IHall;
  onDelete: (id: number) => void;
}

export const HallManagement: React.FC<IHallManagement> = ({ hall, onDelete}) => {

  return (
    <div className="hallSet__list-item">
      <div>–</div>
      <div>{hall.hall_name}</div>
      <div className="hallSet__delete-button" onClick={() => onDelete(hall.id)} ></div>
    </div>
  );
};
