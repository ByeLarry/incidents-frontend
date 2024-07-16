import { memo } from "react";
import { Spiner } from "../ui/spiner/spiner";
import { LngLat } from "@yandex/ymaps3-types";
import { CategoryDto } from "../../dto/categories.dto";
import { CreateMarkForm } from "../forms/create-mark.form";

interface Props {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  propsCallback?: () => void;
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
      {props.submitting && <Spiner lightMode fixed visible size={96} />}
      <div className="modal__wrapper">
        <h3 className={"modal__title"}>{"Инцидент"}</h3>
        <CreateMarkForm
          coords={props.coords}
          categories={props.categories}
          setModalOpen={props.setModalOpen}
          propsCallback={props.propsCallback}
          submitting={props.submitting}
          setCheckedValue={props.setCheckedValue}
          checkedValue={props.checkedValue}
        />
      </div>
    </>
  );
});
