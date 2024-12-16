import { memo } from "react";
import { Spinner } from "../ui/spinner/spinner";
import { LngLat } from "@yandex/ymaps3-types";
import { CreateMarkForm } from "../forms/create-mark.form";
import { XXXLARGE_SIZE_MARKER } from "../../utils";
import { CategoryDto } from "../../dto";

interface Props {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  coords: [number, number] | LngLat;
  categories: CategoryDto[];
  setCategories: React.Dispatch<React.SetStateAction<CategoryDto[]>>;
  submitting: boolean;
  checkedValue?: string;
  setCheckedValue: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export const MarkerCandidateModal: React.FC<Props> = memo((props: Props) => {
  return (
    <>
      {props.submitting && <Spinner lightMode fixed visible size={XXXLARGE_SIZE_MARKER} />}
      <div className="modal__wrapper">
        <h3 className={"modal__title"}>{"Инцидент"}</h3>
        <CreateMarkForm
          coords={props.coords}
          categories={props.categories}
          setModalOpen={props.setModalOpen}
          submitting={props.submitting}
          setCheckedValue={props.setCheckedValue}
          checkedValue={props.checkedValue}
        />
      </div>
    </>
  );
});
