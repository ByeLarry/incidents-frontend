import { LngLat } from "@yandex/ymaps3-types";
import { useEffect, useState } from "react";
import { YMapDefaultMarker } from "ymap3-components";
import "./markers.scss";
import "./create-incident-form.scss";
import { ModalComponent } from "../../Modal/modal";
import { MarksService } from "../../../services/marks.service";
import { CategoryDto } from "../../../dto/categories.dto";
import { toast } from "sonner";
import { AxiosError, AxiosResponse } from "axios";
import { observer } from "mobx-react-lite";
import { MarkerCandidateModal } from "../../modals/marker-candidate.modal";

interface Props {
  coords: [number, number] | LngLat;
  color?: string;
  id?: string;
  Key?: string;
  source?: string;
  draggable?: boolean;
  mapFollowsOnDrag?: boolean;
  onClick?: (event?: MouseEvent) => void;
  onDoubleClick?: (event?: MouseEvent) => void;
  visible?: boolean;
  callback?: () => void;
}
export const MarkerCandidateIncidentComponent: React.FC<Props> = observer(
  (props: Props) => {
    const [coords, setCoords] = useState<LngLat>(props.coords);
    const [modalOpen, setModalOpen] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [categories, setCategories] = useState<CategoryDto[]>([]);
    const [checkedValue, setCheckedValue] = useState<string | undefined>();

    useEffect(() => {
      setCoords(props.coords);
    }, [props.coords, props.visible]);

    const onCandidateClickHandler = async () => {
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
              categories={categories}
              submitting={submitting}
              setCategories={setCategories}
              setModalOpen={setModalOpen}
              coords={coords}
              checkedValue={checkedValue}
              setCheckedValue={setCheckedValue}
              propsCallback={props.callback }
            />
          </ModalComponent>
        }
      </>
    );
  }
);
