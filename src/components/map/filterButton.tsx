import { useEffect, useState } from "react";
import { FaFilter } from "react-icons/fa";
import { YMapControlButton } from "ymap3-components";
import "./filterButton.scss";
import { AxiosError, AxiosResponse } from "axios";
import { toast } from "sonner";
import { Feature } from "@yandex/ymaps3-clusterer";
import { observer } from "mobx-react-lite";
import { ModalComponent } from "../Modal/modal";
import selectedCategoriesStore from "../../stores/selectedCategories.store";
import { CategoryDto } from "../../dto/categories.dto";
import { MarksService } from "../../services/marks.service";
import { FilterButtonModal } from "../modals/filter-button.modal";

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
        <FilterButtonModal
          categories={categories}
          selectedCategoriesLocal={selectedCategoriesLocal}
          setSelectedCategoriesLocal={setSelectedCategoriesLocal}
          setFilteredPoints={props.setFilteredPoints}
          points={props.points}
          setModalOpen={setModalOpen}
          setSelectedCategories={setSelectedCategories}
          submitting={submitting}
        />
      </ModalComponent>
    </>
  );
});
