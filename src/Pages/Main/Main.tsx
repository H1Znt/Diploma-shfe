import { useNavigate } from "react-router-dom";
import { Header } from "../../components/Header";
import { useAuth } from "../../hooks/useAuth";
import { Button, Stack } from "react-bootstrap";
import { ChangeBgImage } from "../../hooks/ChangeBgImage";

import "../../styles/main.scss";

export const Main = () => {
  const navigate = useNavigate();
  const { transferIn } = useAuth();

  const handleLogin = () => {
    localStorage.setItem("isTransferred", "true");
    transferIn();
    navigate("/login");
  };

  return (
    <ChangeBgImage>
      <Stack
        direction="horizontal"
        className="main p-3 col-sm-12 col-md-9 col-lg-9 col-xl-9 mx-auto "
      >
        <div className="main__header">
          <Header />
        </div>
        <div className="main__header-button ms-auto ">
          <Button variant="secondary" onClick={handleLogin}>
            Войти
          </Button>
        </div>
      </Stack>
    </ChangeBgImage>
  );
};

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
