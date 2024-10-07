import { FcGoogle } from "react-icons/fc";
import { LARGE_SIZE_MARKER } from "../../libs/utils";
import { FaYandex } from "react-icons/fa";
import "./auth-providers.scss";

export const AuthProviders: React.FC = () => {
  return (
    <div className="wrapper">
      <FcGoogle
        className="icon"
        size={LARGE_SIZE_MARKER}
        onClick={() => {
          window.location.replace(import.meta.env.VITE_GOOGLE_AUTH_URL);
        }}
      />
      <FaYandex
        className="icon"
        size={LARGE_SIZE_MARKER}
        color="red"
        onClick={() =>
          window.location.replace(import.meta.env.VITE_YANDEX_AUTH_URL)
        }
      />
    </div>
  );
};
