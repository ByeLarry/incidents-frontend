import { useNavigate } from "react-router-dom";
import ThemeStore from "../../stores/theme.store";
import styles from "./success-auth.module.scss";
import { useEffect } from "react";
import { useGoogleAuthSuccess } from "../../libs/hooks";
import { ACCESS_TOKEN_KEY } from "../../libs/utils";
import userStore from "../../stores/user.store";
import { AuthProvidersEnum } from "../../libs/enums";
import { useYandexAuthSuccess } from "../../libs/hooks/yandex-auth-success.hook";

export const SuccessAuthPage: React.FC = () => {
  const navigate = useNavigate();
  const { googleAuthSuccess, dataGoogleAuthSuccess, errorGoogleAuthSuccess } =
    useGoogleAuthSuccess();

  const { yandexAuthSuccess, dataYandexAuthSuccess, errorYandexAuthSuccess } =
    useYandexAuthSuccess();
  useEffect(() => {
    const currentUrl = location.search;

    const urlPattern =
      /[?&]provider=([^&]+)&token=([^&]+)&name=([^&]+)&surname=([^&]+)/;
    const match = currentUrl.match(urlPattern);

    if (match) {
      const provider = match[1];
      const token = match[2];
      const name = match[3];
      const surname = match[4];

      if (provider === AuthProvidersEnum.GOOGLE)
        googleAuthSuccess({
          token,
          name,
          surname,
        });
      if (provider === AuthProvidersEnum.YANDEX)
        yandexAuthSuccess({
          token,
          name,
          surname,
        });
    } else {
      navigate("/", { replace: true });
    }
  }, [googleAuthSuccess, navigate, yandexAuthSuccess]);

  useEffect(() => {
    if (dataGoogleAuthSuccess || dataYandexAuthSuccess) {
      if (dataGoogleAuthSuccess) {
        userStore.changeUser(dataGoogleAuthSuccess.data.user ?? null);
        localStorage.setItem(
          ACCESS_TOKEN_KEY,
          dataGoogleAuthSuccess.data.accessToken
        );
      }
      if (dataYandexAuthSuccess) {
        userStore.changeUser(dataYandexAuthSuccess.data.user ?? null);
        localStorage.setItem(
          ACCESS_TOKEN_KEY,
          dataYandexAuthSuccess.data.accessToken
        );
      }

      navigate("/", { replace: true });
    }
  }, [dataGoogleAuthSuccess, dataYandexAuthSuccess, navigate]);

  useEffect(() => {
    if (errorGoogleAuthSuccess || errorYandexAuthSuccess) {
      navigate("/", { replace: true });
    }
  }, [errorGoogleAuthSuccess, errorYandexAuthSuccess, navigate]);

  const { lightMode } = ThemeStore;
  return (
    <main
      className={`${styles.main} user-select-none ${
        lightMode ? "background_slide_light" : "background_slide"
      }`}
    ></main>
  );
};
