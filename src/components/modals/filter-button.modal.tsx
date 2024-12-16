import { Spinner } from "../ui/spinner/spinner";
import "../../features/map/controls/filter-button/filter-button.scss";
import { ButtonComponent } from "../ui/button/button";
import { Feature } from "@yandex/ymaps3-clusterer";
import { memo, useCallback } from "react";
import { CategoryDto } from "../../dto";
import { XXXLARGE_SIZE_MARKER } from "../../utils";

interface Props {
  submitting: boolean;
  categories: CategoryDto[];
  selectedCategoriesLocal: number[];
  setSelectedCategoriesLocal: React.Dispatch<React.SetStateAction<number[]>>;
  setFilteredPoints: React.Dispatch<React.SetStateAction<Feature[]>>;
  points: Feature[];
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedCategories: (selectedCategories: number[]) => void;
}

export const FilterButtonModal: React.FC<Props> = memo((props: Props) => {
  const toggleCategory = (categoryId: number) => {
    if (props.selectedCategoriesLocal.includes(categoryId)) {
      props.setSelectedCategoriesLocal(
        props.selectedCategoriesLocal.filter((id) => id !== categoryId)
      );
    } else {
      props.setSelectedCategoriesLocal([
        ...props.selectedCategoriesLocal,
        categoryId,
      ]);
    }
  };

  const onButtonClickHandler = useCallback(() => {
    const filteredPoints = props.points.filter((point) =>
      props.selectedCategoriesLocal.includes(
        point.properties?.categoryId as number
      )
    );
    props.setSelectedCategories(props.selectedCategoriesLocal);
    props.setFilteredPoints(filteredPoints);
    props.setModalOpen(false);
  }, [props]);

  const isSelectedAll = useCallback(() => {
    return props.selectedCategoriesLocal.length === props.categories.length;
  }, [props.categories.length, props.selectedCategoriesLocal.length]);

  const onTakeAllRadioButtonHandler = useCallback(() => {
    if (isSelectedAll()) props.setSelectedCategoriesLocal([]);
    else
      props.setSelectedCategoriesLocal(
        props.categories.map((category) => category.id)
      );
  }, [isSelectedAll, props]);

  return (
    <>
      {props.submitting && (
        <Spinner lightMode fixed visible size={XXXLARGE_SIZE_MARKER} />
      )}
      <h3 className="modal__title">{"Фильтр"}</h3>
      <ul className="filter__list">
        <li className="filter__item">
          <input
            className="item__checkbox"
            type="radio"
            checked={isSelectedAll()}
            onChange={onTakeAllRadioButtonHandler}
            onClick={onTakeAllRadioButtonHandler}
            disabled={props.categories.length === 0}
          />
          <h5 className="item__title">{"Все"}</h5>
        </li>
        {props.categories.map((category) => (
          <li className="filter__item" key={category.id}>
            <input
              className="item__checkbox"
              type="checkbox"
              checked={props.selectedCategoriesLocal.includes(category.id)}
              onChange={() => toggleCategory(category.id)}
            />
            <h5 className="item__title">{category.name}</h5>
          </li>
        ))}
      </ul>
      <div className="button__wrapper">
        <ButtonComponent
          type="submit"
          modalButton
          onClick={onButtonClickHandler}
        >
          Применить
        </ButtonComponent>
      </div>
    </>
  );
});
