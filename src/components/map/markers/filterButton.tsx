import { useEffect, useState } from "react";
import { FaFilter } from "react-icons/fa";
import { YMapControlButton } from "ymap3-components";
import { ModalComponent } from "../../Modal/modal";
import "./filterButton.scss";
import { Spiner } from "../../ui/spiner/spiner";
import { AxiosError, AxiosResponse } from "axios";
import { CategoryDto } from "../../../dto/categories.dto";
import { MarksService } from "../../../services/marks.service";
import { toast } from "sonner";
import { Feature } from "@yandex/ymaps3-clusterer";
import { ButtonComponent } from "../../ui/button/button";
import selectedCategoriesStore from "../../../stores/selectedCategories.store";
import { observer } from "mobx-react-lite";

interface Props {
  points: Feature[];
  setFilteredPoints: React.Dispatch<React.SetStateAction<Feature[]>>;
}

export const FilterButton: React.FC<Props> = observer((props: Props) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [categories, setCategories] = useState<CategoryDto[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [selectedCategoriesLocal, setSelectedCategoriesLocal] = useState<
    number[]
  >([]);
  const { selectedCategories, setSelectedCategories } = selectedCategoriesStore;

  useEffect(() => {
    setSelectedCategoriesLocal(selectedCategories);
  }, [selectedCategories]);

  const onFilterClickHandler = async () => {
    setModalOpen(true);
    try {
      setSubmitting(true);
      const response: AxiosResponse<CategoryDto[]> =
        await MarksService.getCategories();
      setCategories(response.data);
      setSubmitting(false);
    } catch (error) {
      setSubmitting(false);
      if (error instanceof AxiosError) {
        switch (error.response?.status) {
          case 404:
            toast.error("Категории не загружены");
            break;
          case 500:
            toast.error("Произошла серверная ошибка");
            break;
          default:
            toast.error("Произошла непредвиденная ошибка");
        }
      }
    }
  };

  const toggleCategory = (categoryId: number) => {
    if (selectedCategoriesLocal.includes(categoryId)) {
      setSelectedCategoriesLocal(
        selectedCategoriesLocal.filter((id) => id !== categoryId)
      );
    } else {
      setSelectedCategoriesLocal([...selectedCategoriesLocal, categoryId]);
    }
  };

  const onButtonClickHandler = () => {
    const filteredPoints = props.points.filter((point) =>
      selectedCategoriesLocal.includes(point.properties?.categoryId as number)
    );
    setSelectedCategories(selectedCategoriesLocal);
    props.setFilteredPoints(filteredPoints);
    setModalOpen(false);
  };

  return (
    <>
      <YMapControlButton
        onClick={() => {
          setModalOpen(true);
          onFilterClickHandler();
        }}
      >
        <FaFilter size={24} />
      </YMapControlButton>
      <ModalComponent
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
        }}
      >
        {submitting && <Spiner lightMode fixed visible size={96} />}
        <h3 className="modal__title">{"Фильтр"}</h3>
        <ul className="filter__list">
          {categories.map((category) => (
            <li className="filter__item" key={category.id}>
              <input
                className="item__checkbox"
                type="checkbox"
                checked={selectedCategoriesLocal.includes(category.id)}
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
      </ModalComponent>
    </>
  );
});
