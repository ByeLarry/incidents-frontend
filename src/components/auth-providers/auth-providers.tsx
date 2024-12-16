import { ButtonComponent } from "../ui/button/button";
import "./auth-providers.scss";
import GoogleButton from "react-google-button";
import yandex_button from "../../assets/images/svg/yandex-button.svg";

export const AuthProviders: React.FC = () => {
  return (
    <div className="wrapper">
      <ButtonComponent
        noHover
        onClick={() =>
          window.location.replace(import.meta.env.VITE_YANDEX_AUTH_URL)
        }
      >
        <img src={yandex_button} alt="yandex" />
      </ButtonComponent>
      <GoogleButton
        onClick={() => {
          window.location.replace(import.meta.env.VITE_GOOGLE_AUTH_URL);
        }}
      />
    </div>
  );
};
