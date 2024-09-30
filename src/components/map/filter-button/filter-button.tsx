import { useEffect, useState } from "react";
import { FaFilter } from "react-icons/fa";
import { YMapControlButton } from "ymap3-components";
import "./filter-button.scss";
import { toast } from "sonner";
import { Feature } from "@yandex/ymaps3-clusterer";
import { observer } from "mobx-react-lite";
import { ModalComponent } from "../../modal/modal";
import selectedCategoriesStore from "../../../stores/selected-categories.store";
import { CategoryDto } from "../../../libs/dto/categories.dto";
import { FilterButtonModal } from "../../modals/filter-button.modal";
import { useGetCategories } from "../../../libs/hooks/get-categories.hook";
import { MEDIUM_SIZE_MARKER } from "../../../libs/utils/marker-sizes.util";

interface Props {
  points: Feature[];
  setFilteredPoints: React.Dispatch<React.SetStateAction<Feature[]>>;
  title: string;
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
        <FaFilter title={props.title} size={MEDIUM_SIZE_MARKER} />
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
