import { LngLat } from "@yandex/ymaps3-types";
import { useEffect, useState } from "react";
import { YMapDefaultMarker } from "ymap3-components";
import "./styles/markers.scss";
import "./styles/creating-form.scss";
import { observer } from "mobx-react-lite";
import { ModalComponent } from "../../../components/modal/modal";
import { MarkerCandidateModal } from "../../../components/modals";
import { CategoryDto } from "../../../dto";
import { useGetCategories } from "../../../hooks";

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
export const CreationComponent: React.FC<Props> = observer(
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
