import { FC, PropsWithChildren } from "react";
import { useAuth } from "../../hooks/useAuth";
import "../../styles/_bgImage.scss";

export const ChangeBgImage: FC<PropsWithChildren> = ({ children }) => {
  const { isTransferred } = useAuth();

  const backgroundImage = !isTransferred ? "bgImgMain" : "bgImgLogin";

  return <div className={`containerBg ${backgroundImage}`}>{children}</div>;
};
