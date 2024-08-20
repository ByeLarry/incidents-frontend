import { toast } from "sonner";
import csrfStore from "../../stores/csrf.store";
import { ButtonComponent } from "../ui/button/button";
import styles from "../header/header.module.scss";
import userStore from "../../stores/user.store";
import { memo, useEffect } from "react";
import { useLogout } from "../../hooks/useLogout.hook";

interface Props {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const LogoutModal: React.FC<Props> = memo((props: Props) => {
  const { mutateLogout, isSuccessLogout } = useLogout();

  useEffect(() => {
    if (isSuccessLogout) {
      toast.success("Вы вышли из аккаунта");
      userStore.changeUser(null);
      csrfStore.changeCsrf("");
      props.setModalOpen(false);
    }
  }, [isSuccessLogout, props]);

  const handleLogout = () => {
    mutateLogout({ csrf_token: csrfStore.csrf });
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
