import { toast } from "sonner";
import { AuthService } from "../../services/auth.service";
import csrfStore from "../../stores/csrf.store";
import { ButtonComponent } from "../ui/button/button";
import styles from "../ui/header/header.module.scss";
import userStore from "../../stores/user.store";
import { memo } from "react";

interface Props {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const LogoutModal: React.FC<Props> = memo((props: Props) => {
  const handleLogout = () => {
    AuthService.postLogout({ csrf_token: csrfStore.csrf })
      .then(() => {
        toast.success("Вы вышли из аккаунта");
        userStore.changeUser(null);
        csrfStore.changeCsrf("");
        props.setModalOpen(false);
      })
      .catch(() => {
        toast.error("Произошла ошибка при выходе из аккаунта");
      });
  };
  return (
    <>
      <h3 className={styles.modal__title}>Вы уверены, что хотите выйти?</h3>
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
          onClick={() => props.setModalOpen(false)}
        >
          Нет
        </ButtonComponent>
      </div>
    </>
  );
});
