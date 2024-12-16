import userStore from "../../stores/user.store";
import { memo, useEffect } from "react";
import { ConfirmModal } from "./confirm.modal";
import { useDeleteMark } from "../../hooks";

interface Props {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  markId?: number;
}

export const DeleteMarkModal: React.FC<Props> = memo((props: Props) => {
  const { mutateDeleteMark, isPendingDeleteMark, isSuccessDeleteMark } =
    useDeleteMark();

  useEffect(() => {
    if (isSuccessDeleteMark) {
      userStore.changeUser(null);
      props.setModalOpen(false);
    }
  }, [isSuccessDeleteMark, props]);

  const handleLogout = () => {
    mutateDeleteMark(props.markId);
  };
  return (
    <ConfirmModal
      isPending={isPendingDeleteMark}
      confirmationCb={handleLogout}
      refusalCb={() => props.setModalOpen(false)}
      text={"Вы действительно хотите удалить происшествие?"}
    />
  );
});
