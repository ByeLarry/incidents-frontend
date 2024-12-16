import userStore from "../../stores/user.store";
import { memo, useEffect } from "react";
import { ConfirmModal } from "./confirm.modal";
import { useLogout } from "../../hooks";

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
    <ConfirmModal
      isPending={isPendingLogout}
      confirmationCb={handleLogout}
      refusalCb={() => props.setModalOpen(false)}
      text={"Вы действительно хотите выйти?"}
    />
  );
});
