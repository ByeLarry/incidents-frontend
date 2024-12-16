import { ButtonComponent } from "../ui/button/button";
import styles from "../header/header.module.scss";
import { memo } from "react";
import { Spinner } from "../ui/spinner/spinner";
import { MEDIUM_SIZE_MARKER } from "../../utils";

interface Props {
  isPending: boolean;
  confirmationCb: () => void;
  refusalCb: () => void;
  text: string
}

export const ConfirmModal: React.FC<Props> = memo((props: Props) => {

  return (
    <>
      <h3 className={styles.modal__title}>{props.text}</h3>
      <div className={styles.buttons__wrapper}>
        <ButtonComponent
          type="button"
          ariaLabel="Да"
          modalButton
          onClick={props.confirmationCb}
        >
          {!props.isPending ? (
            "Да"
          ) : (
            <Spinner visible={true} size={MEDIUM_SIZE_MARKER} lightMode />
          )}
        </ButtonComponent>
        <ButtonComponent
          type="button"
          ariaLabel="Нет"
          modalButton
          onClick={props.refusalCb}
        >
          Нет
        </ButtonComponent>
      </div>
      <div style={{ marginTop: "20px" }}></div>
    </>
  );
});
