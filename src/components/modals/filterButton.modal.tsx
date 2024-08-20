import { Spiner } from "../ui/spiner/spiner";
import "../map/filterButton.scss";
import { ButtonComponent } from "../ui/button/button";
import { CategoryDto } from "../../dto/categories.dto";
import { Feature } from "@yandex/ymaps3-clusterer";
import { memo, useCallback } from "react";
import { XXXLARGE_SIZE_MARKER } from "../../utils/markerSizes";
import selectedCategoriesStore from "../../stores/selectedCategories.store";

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

  const isSameLength = (): boolean => {
    return (
      props.selectedCategoriesLocal.length ===
      selectedCategoriesStore.selectedCategories.length
    );
  };

  const compareCurrentCategories = (): boolean => {
    if (props.categories.length === 0) return true;

    if (!isSameLength()) return false;

    const localSet = new Set(props.selectedCategoriesLocal);
    const storeSet = new Set(selectedCategoriesStore.selectedCategories);

    return (
      localSet.size === storeSet.size &&
      [...localSet].every((item) => storeSet.has(item))
    );
  };

  return (
    <>
      {props.submitting && (
        <Spiner lightMode fixed visible size={XXXLARGE_SIZE_MARKER} />
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
          className={`button ${compareCurrentCategories() ? "" : "color-red"}`}
          modalButton
          onClick={onButtonClickHandler}
        >
          Применить
        </ButtonComponent>
      </div>
    </>
  );
});
