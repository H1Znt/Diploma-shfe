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
        <div className="header__title" onClick={handleClose}>
          <div className="">
            <span>
              ИДЁМ<span className="header__title-letter">В</span>КИНО
            </span>
          </div>

          <div className="header__title-administrate">
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
