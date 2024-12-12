import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import "./header.scss";

export const Header = () => {
  const navigate = useNavigate();
  const { isTransferred, transferOut } = useAuth();

  const handleClose = () => {
    localStorage.setItem("isAuthenticated", "false");
    localStorage.setItem("isTransferred", "false");
    transferOut();
    navigate("/");
  };

  return (
    <header className="header">
      <div>
        {(isTransferred && (
          <div className="header__title" onClick={handleClose}>
            <span>
              ИДЁМ<span className="header__title-letter">В</span>КИНО
            </span>
            <span className="header__title-administrate">
              Администраторррская
            </span>
          </div>
        )) ||
          (!isTransferred && (
            <div className="header__title" onClick={handleClose}>
              <span>
              ИДЁМ<span className="header__title-letter">В</span>КИНО
              </span>
            </div>
          ))}
      </div>
    </header>
  );
};

//   return (
//     <header className="header">
//       {(!isTransferred && (
//         <div>
//           <div className="header__title" onClick={handleClose}>
//             <span>
//               Идём<span>В</span>кино
//             </span>
//             <span>Администраторская</span>
//           </div>
//           <div className="header__button">
//             <button onClick={handleLogin}>Войти</button>
//           </div>
//         </div>
//       )) ||
//         (isTransferred && (
//           <div>
//             <div className="header__title" onClick={handleClose}>
//               <span>
//                 Идём<span>В</span>кино
//               </span>
//               <span>Администраторская</span>
//             </div>
//           </div>
//         ))}
//     </header>
//   );
// };
