import { ButtonComponent } from "../ui/button/button";
import styles from "../header/header.module.scss";
import userStore from "../../stores/user.store";
import { memo, useEffect } from "react";
import { useLogout } from "../../libs/hooks/logout.hook";
import { MEDIUM_SIZE_MARKER } from "../../libs/utils";
import { Spinner } from "../ui/spinner/spinner";

interface Props {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const LogoutModal: React.FC<Props> = memo((props: Props) => {
  const { mutateLogout, isSuccessLogout, isPendingLogout } = useLogout();

  useEffect(() => {
    if (isSuccessLogout) {
      userStore.changeUser(null);
      props.setModalOpen(false);
    }
  }, [isSuccessLogout, props]);

  const handleLogout = () => {
    mutateLogout();
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
          {!isPendingLogout ? (
            "Да"
          ) : (
            <Spinner visible={true} size={MEDIUM_SIZE_MARKER} lightMode />
          )}
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
      <div style={{ marginTop: "20px" }}></div>
    </>
  );
});
