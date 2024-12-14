import { FC, PropsWithChildren } from "react";
import { useAuth } from "./useAuth";
import BgMain from "../../img/background-main.jpg";
import BgLogin from "../../img/background-login.jpg";
import "../styles/containerBg.scss";

export const ChangeBgImage: FC<PropsWithChildren> = ({ children }) => {
  const { isTransferred } = useAuth();

  const backgroundStyle = {
    width: "100%",
    height: "100vh",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundImage: isTransferred
      ? `linear-gradient(to right, rgba(0, 0, 0, 0.5) 0 100%), url(${BgLogin})`
      : `url(${BgMain})`,
  };

  return (
    <div className="containerBg" style={backgroundStyle}>
      {children}
    </div>
  );
};
