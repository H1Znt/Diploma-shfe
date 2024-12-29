import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import "../../styles/_header.scss";

export const Header = () => {
  const navigate = useNavigate();
  const { isTransferred, transferOut, logout } = useAuth();

  const handleClose = () => {
    transferOut();
    logout();
    navigate("/");
  };

  return (
    <header className="header">
      {(isTransferred && (
        <div className="header__title" >
          <div>
            <span onClick={handleClose}>
              ИДЁМ<span className="header__title-letter">В</span>КИНО
            </span>
          </div>

          <div className="header__title-administrate" onClick={handleClose}>
            <span>Администраторррская</span>
          </div>
        </div>
      )) ||
        (!isTransferred && (
          <div className="header__title" onClick={handleClose}>
            <span>
              ИДЁМ<span className="header__title-letter">В</span>КИНО
            </span>
          </div>
        ))}
    </header>
  );
};