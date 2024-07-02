import { Link } from "react-router-dom";
import styles from "./header.module.scss";
import "../../../index.scss";
import { observer } from "mobx-react-lite";
import ThemeStore from "../../../stores/theme.store";
import { useEffect, useState } from "react";
import { ToggleComponent } from "../toggle/toggle";
import { RiCriminalFill } from "react-icons/ri";
import { GiBowieKnife } from "react-icons/gi";
import UserStore from "../../../stores/user.store";
import { ButtonComponent } from "../button/button";
import { IoIosLogOut } from "react-icons/io";
import { ModalComponent } from "../../Modal/modal";
import { AuthService } from "../../../services/auth.service";
import { toast } from "sonner";
import CsrfStore from "../../../stores/csrf.store";

export const Header: React.FC = observer(() => {
  const { lightMode } = ThemeStore;
  const { isEmptyUser } = UserStore;
  const [modalOpen, setModalOpen] = useState(false);

  const handleLogout = () => {
    AuthService.postLogout({ csrf_token: CsrfStore.csrf })
      .then(() => {
        toast.success("Вы вышли из аккаунта");
        UserStore.changeUser(null);
        CsrfStore.changeCsrf("");
        setModalOpen(false);
      })
      .catch(() => {
        toast.error("Произошла ошибка при выходе из аккаунта");
      });
  };

  useEffect(() => {
    if (!lightMode) {
      document.body.classList.add("dark-mode");
      document.body.classList.remove("light-mode");
    } else {
      document.body.classList.add("light-mode");
      document.body.classList.remove("dark-mode");
    }
  }, [lightMode]);

  return (
    <header
      className={`${styles.header} ${
        lightMode ? styles.header_light : ""
      } user-select-none cursor_crosshair`}
    >
      <div className={styles.logo__wrapper}>
        <h1 className={styles.header__title}>Incidents</h1>
        <div className={styles.icon__wrapper}>
          <RiCriminalFill size={48} />
          <div className={styles.knife__wrapper}>
            <GiBowieKnife className={styles.knife__icon} size={28} />
          </div>
        </div>
      </div>
      <nav className={styles.header__nav}>
        <ul className={styles.header__list}>
          <li className={styles.list__item}>
            <ToggleComponent />
          </li>
          {isEmptyUser() ? (
            <>
              <li className={styles.list__item}>
                <Link
                  to={"signup"}
                  className={`link ${styles.list__item} ${
                    lightMode ? "link_light" : ""
                  }`}
                >
                  Регистрация
                </Link>
              </li>
              <li className={styles.list__item}>
                <Link
                  to={"signin"}
                  className={`link ${styles.list__item} ${
                    lightMode ? "link_light" : ""
                  }`}
                >
                  Вход
                </Link>
              </li>
            </>
          ) : (
            <li className={styles.list__item}>
              <ButtonComponent
                type="button"
                ariaLabel="Выход"
                noHover={lightMode}
                className="position_relative"
                onClick={() => setModalOpen(true)}
              >
                <IoIosLogOut size={30} color={lightMode ? "black" : "white"} />
              </ButtonComponent>
            </li>
          )}
        </ul>
      </nav>
      <ModalComponent isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <h3 style={{ textAlign: "center", fontWeight: "normal" }}>
          Вы уверены, что хотите выйти?
        </h3>
        <div className={styles.buttons__wrapper}>
          <ButtonComponent
            type="button"
            ariaLabel="Да"
            modalButton
            onClick={handleLogout}
          >
            Да
          </ButtonComponent>
          <ButtonComponent
            type="button"
            ariaLabel="Нет"
            modalButton
            onClick={() => setModalOpen(false)}
          >
            Нет
          </ButtonComponent>
        </div>
      </ModalComponent>
    </header>
  );
});
