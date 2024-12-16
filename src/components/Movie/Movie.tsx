import { useNavigate } from "react-router-dom";
import { IFilm, IHall, ISeance } from "../../models";
import "../../styles/_movie.scss";

interface IMovie {
  films: IFilm[];
  halls: IHall[];
  seances: ISeance[];
}

export const Movie: React.FC<IMovie> = ({ films, halls, seances }) => {
  const navigate = useNavigate();

  const handleSeanceClick = (seanceId: number) => {
    navigate(`/seats/${seanceId}`); // Переход на страницу выбора мест с ID сеанса
  };
  return (
    <div className="movie">
      <div>
        {films.map((film) => (
          <div
            key={film.id}
            style={{
              backgroundColor: "#fff",
              padding: "20px",
              marginBottom: "20px",
              borderRadius: "10px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div style={{ display: "flex", gap: "20px" }}>
              <img
                src={film.film_poster}
                alt={film.film_name}
                style={{ width: "120px", borderRadius: "8px", height: "100%"}}
              />
              <div>
                <h3 style={{ margin: "0 0 10px" }}>{film.film_name}</h3>
                <p style={{ margin: "0 0 5px", color: "#666" }}>
                  {film.film_duration} минут, {film.film_origin}
                </p>
                <p style={{ margin: "0", color: "#888" }}>
                  {film.film_description}
                </p>
              </div>
            </div>
            <div style={{ marginTop: "20px" }}>
              {halls.map((hall) => {
                const hallSeances = seances.filter(
                  (seance) =>
                    seance.seance_filmid === film.id &&
                    seance.seance_hallid === hall.id
                );
                if (hallSeances.length === 0) return null;
                return (
                  <div key={hall.id} style={{ marginBottom: "10px" }}>
                    <h4 style={{ margin: "0 0 10px", color: "black" }}>
                      Зал: {hall.hall_name}
                    </h4>
                    <div
                      style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}
                    >
                      {hallSeances.map((seance) => (
                        <button
                          key={seance.id}
                          onClick={() => handleSeanceClick(seance.id)}
                          style={{
                            padding: "5px 10px",
                            backgroundColor: "#f4f4f4",
                            border: "1px solid #ddd",
                            borderRadius: "5px",
                            cursor: "pointer",
                          }}
                        >
                          {seance.seance_time}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
