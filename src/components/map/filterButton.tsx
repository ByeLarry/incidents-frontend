import { useEffect, useState } from "react";
import { FaFilter } from "react-icons/fa";
import { YMapControlButton } from "ymap3-components";
import "./filterButton.scss";
import { toast } from "sonner";
import { Feature } from "@yandex/ymaps3-clusterer";
import { observer } from "mobx-react-lite";
import { ModalComponent } from "../modal/modal";
import selectedCategoriesStore from "../../stores/selectedCategories.store";
import { CategoryDto } from "../../dto/categories.dto";
import { FilterButtonModal } from "../modals/filterButton.modal";
import { useGetCategories } from "../../hooks/useGetCategories.hook";
import { MEDIUM_SIZE_MARKER } from "../../utils/markerSizes";

interface Props {
  points: Feature[];
  setFilteredPoints: React.Dispatch<React.SetStateAction<Feature[]>>;
}

export const FilterButton: React.FC<Props> = observer((props: Props) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [localCategories, setLocalCategories] = useState<CategoryDto[]>([]);
  const [selectedCategoriesLocal, setSelectedCategoriesLocal] = useState<
    number[]
  >([]);
  const { selectedCategories, setSelectedCategories } = selectedCategoriesStore;
  const {
    categories,
    isLoadingGetCategories,
    isErrorGetCategories,
    errorGetCategories,
    isFetchingGetCategories,
    isSuccessGetCategories,
  } = useGetCategories();

  useEffect(() => {
    if (categories && isSuccessGetCategories) setLocalCategories(categories);
  }, [categories, isSuccessGetCategories]);

  useEffect(() => {
    if (isErrorGetCategories) {
      toast.error("Серверная ошибка при загрузке категорий");
    }
  }, [isErrorGetCategories, errorGetCategories]);

  useEffect(() => {
    setSelectedCategoriesLocal(selectedCategories);
  }, [selectedCategories]);

  const onFilterClickHandler = async () => {
    setModalOpen(true);
  };

  return (
    <>
      <YMapControlButton
        onClick={() => {
          setModalOpen(true);
          onFilterClickHandler();
        }}
      >
        <FaFilter size={MEDIUM_SIZE_MARKER} />
      </YMapControlButton>
      <ModalComponent
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
        }}
      >
        <FilterButtonModal
          categories={localCategories}
          selectedCategoriesLocal={selectedCategoriesLocal}
          setSelectedCategoriesLocal={setSelectedCategoriesLocal}
          setFilteredPoints={props.setFilteredPoints}
          points={props.points}
          setModalOpen={setModalOpen}
          setSelectedCategories={setSelectedCategories}
          submitting={isLoadingGetCategories || isFetchingGetCategories}
        />
      </ModalComponent>
    </>
  );
});
