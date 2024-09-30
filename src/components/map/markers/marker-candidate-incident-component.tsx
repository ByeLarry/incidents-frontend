import { LngLat } from "@yandex/ymaps3-types";
import { useEffect, useState } from "react";
import { YMapDefaultMarker } from "ymap3-components";
import "./markers.scss";
import "./creating-form.scss";
import { ModalComponent } from "../../modal/modal";
import { CategoryDto } from "../../../libs/dto/categories.dto";
import { observer } from "mobx-react-lite";
import { MarkerCandidateModal } from "../../modals/marker-candidate.modal";
import { useGetCategories } from "../../../libs/hooks/get-categories.hook";

interface Props {
  coords: [number, number] | LngLat;
  color: string;
  id?: string;
  Key?: string;
  source: string;
  draggable: boolean;
  mapFollowsOnDrag: boolean;
  onClick?: (event?: MouseEvent) => void;
  onDoubleClick?: (event?: MouseEvent) => void;
  visible: boolean;
}
export const MarkerCandidateIncidentComponent: React.FC<Props> = observer(
  (props: Props) => {
    const [coords, setCoords] = useState<LngLat>(props.coords);
    const [modalOpen, setModalOpen] = useState(false);
    const [localCategories, setLocalCategories] = useState<CategoryDto[]>([]);
    const [checkedValue, setCheckedValue] = useState<string | undefined>();
    const {
      categories,
      isLoadingGetCategories,
      isFetchingGetCategories,
      isSuccessGetCategories,
    } = useGetCategories();

    useEffect(() => {
      if (categories && isSuccessGetCategories) setLocalCategories(categories);
    }, [categories, isSuccessGetCategories]);


    useEffect(() => {
      setCoords(props.coords);
    }, [props.coords, props.visible]);

    const onCandidateClickHandler = async () => {
      setModalOpen(true);
    };

    return (
      <>
        {props.visible && (
          <YMapDefaultMarker
            coordinates={coords}
            source={props.source}
            draggable
            mapFollowsOnDrag
            onFastClick={props.onClick || onCandidateClickHandler}
            color={props.color}
            onDoubleClick={props.onDoubleClick}
            onDragEnd={(coords: LngLat) => {
              setCoords(coords);
            }}
          />
        )}
        {
          <ModalComponent
            isOpen={modalOpen}
            onClose={() => {
              setModalOpen(false);
            }}
          >
            <MarkerCandidateModal
              categories={localCategories}
              submitting={isFetchingGetCategories || isLoadingGetCategories}
              setCategories={setLocalCategories}
              setModalOpen={setModalOpen}
              coords={coords}
              checkedValue={checkedValue}
              setCheckedValue={setCheckedValue}
            />
          </ModalComponent>
        }
      </>
    );
  }
);
