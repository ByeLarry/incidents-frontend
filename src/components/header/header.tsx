import { Link } from "react-router-dom";
import styles from "./header.module.scss";
import '../../index.scss'
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { RiCriminalFill } from "react-icons/ri";
import { GiBowieKnife } from "react-icons/gi";
import { IoIosLogOut } from "react-icons/io";
import themeStore from "../../stores/theme.store";
import userStore from "../../stores/user.store";
import { ToggleComponent } from "../ui/toggle/toggle";
import { ButtonComponent } from "../ui/button/button";
import { ModalComponent } from "../modal/modal";
import { LogoutModal } from "../modals/logout.modal";


export const Header: React.FC = observer(() => {
  const { lightMode } = themeStore;
  const { isEmptyUser } = userStore;
  const [modalOpen, setModalOpen] = useState(false);

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
        <LogoutModal setModalOpen={setModalOpen} />
      </ModalComponent>
    </header>
  );
});
