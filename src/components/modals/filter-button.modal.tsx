import { Spiner } from "../ui/spiner/spiner";
import "../map/filterButton.scss";
import { ButtonComponent } from "../ui/button/button";
import { CategoryDto } from "../../dto/categories.dto";
import { Feature } from "@yandex/ymaps3-clusterer";
import { memo } from "react";

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

  const onButtonClickHandler = () => {
    const filteredPoints = props.points.filter((point) =>
      props.selectedCategoriesLocal.includes(
        point.properties?.categoryId as number
      )
    );
    props.setSelectedCategories(props.selectedCategoriesLocal);
    props.setFilteredPoints(filteredPoints);
    props.setModalOpen(false);
  };
  return (
    <>
      {props.submitting && <Spiner lightMode fixed visible size={96} />}
      <h3 className="modal__title">{"Фильтр"}</h3>
      <ul className="filter__list">
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
          className="button"
          modalButton
          onClick={onButtonClickHandler}
        >
          Применить
        </ButtonComponent>
      </div>
    </>
  );
});