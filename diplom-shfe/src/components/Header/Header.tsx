import { useNavigate } from "react-router-dom";
import "./header.scss";

export const Header = () => {
  const navigate = useNavigate();

  const handleClose = () => {
    localStorage.setItem("isAuthenticated", "false");
    navigate("/");
  };

  return (
    <header className="header">
      <div>
        <div className="header__title" onClick={handleClose}>
          <span>
            Идём<span>В</span>кино
          </span>
          <span>Администраторская</span>
        </div>
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
