import { useNavigate } from "react-router-dom";
import { Header } from "../Header";

export const Main = () => {
  const navigate = useNavigate();
  
  const handleLogin = () => {
    navigate("/login");
  }

  return (
    <div className="">
      <Header />
      <div className="header__button">
        <button onClick={handleLogin}>Войти</button>
      </div>
    </div>
  );
};
