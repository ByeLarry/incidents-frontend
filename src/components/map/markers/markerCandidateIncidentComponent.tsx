import { LngLat } from "@yandex/ymaps3-types";
import { useEffect, useState } from "react";
import { YMapDefaultMarker } from "ymap3-components";
import "./markers.scss";
import "./create-incident-form.scss";
import { ModalComponent } from "../../Modal/modal";
import { FormComponent } from "../../ui/form/form";
import { InputComponent } from "../../ui/input/input";
import { TextareaComponent } from "../../ui/textarea/textarea";
import { SelectComponent } from "../../ui/select/select";
import { ButtonComponent } from "../../ui/button/button";
import { MarksService } from "../../../services/marks.service";
import { CategoryDto } from "../../../dto/categories.dto";
import { toast } from "sonner";
import { AxiosError, AxiosResponse } from "axios";
import useInput from "../../../hooks/input.hook";
import { LabelComponent } from "../../ui/label/label";
import { observer } from "mobx-react-lite";
import userStore from "../../../stores/user.store";
import csrfStore from "../../../stores/csrf.store";
import { categoryIdFromValue } from "../../../utils/categoryIdFromValue";
import { CreateMarkDto } from "../../../dto/create-mark.dto";
import { Spiner } from "../../ui/spiner/spiner";

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
    const { user } = userStore;
    const { csrf } = csrfStore;
    const [coords, setCoords] = useState<LngLat>(props.coords);
    const [modalOpen, setModalOpen] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [formSubmitting, setFormSubmitting] = useState(false);
    const [categories, setCategories] = useState<CategoryDto[]>([]);
    const title = useInput("", { minLength: 3, isEmpty: true, maxLength: 100 });
    const description = useInput("", { maxLength: 199 });
    const [checkedValue, setCheckedValue] = useState<string | undefined>();

    const getTitleErrorMessage = () => {
      if (title.isDirty) {
        if (title.isEmpty) {
          return "Заголовок не введён";
        } else if (title.minLengthError) {
          return "Длина должна быть больше 3 символов";
        } else if (title.maxLengthError) {
          return "Длина должна быть меньше 100 символов";
        }
      }
      return null;
    };

    const getDescriptionErrorMessage = () => {
      if (description.isDirty) {
        if (description.maxLengthError) {
          return "Длина должна быть меньше 200 символов";
        }
      }
      return null;
    };

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

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        setFormSubmitting(true);
        const data: CreateMarkDto = {
          userId: user?._id as string,
          csrf_token: csrf,
          lat: coords[1],
          lng: coords[0],
          title: title.value,
          description: description.value,
          categoryId: categoryIdFromValue(
            checkedValue as string,
            categories
          ) as number,
        };
        await MarksService.postCreateMark(data);
        setFormSubmitting(false);
        title.setDirty(false);
        description.setDirty(false);
        if (props.callback) {
          props.callback();
        }
      } catch (error) {
        setFormSubmitting(false);
        if (error instanceof AxiosError) {
          switch (error.response?.status) {
            case 500:
              toast.error("Произошла серверная ошибка");
              break;
            case 409:
              toast.error("Рядом уже есть инцидент");
              break;
            case 403:
              toast.error("Нельзя отмечать более 5 инцидентов за 12 часов");
              break;
            default:
              toast.error("Произошла непредвиденная ошибка");
          }
        }
      }
      setModalOpen(false);
      title.setValue("");
      description.setValue("");
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
            {submitting && <Spiner lightMode fixed visible size={96} />}
            <div className="modal__wrapper">
              <h3 className={"modal__title"}>{"Инцидент"}</h3>
              <FormComponent noStyle onSubmit={onSubmit}>
                <ul className="form__list">
                  <li className="list__item">
                    <SelectComponent
                      id="incident-category"
                      name="incident-category"
                      values={categories.map((category) => category.name)}
                      width={300}
                      disabled={categories.length === 0 || submitting}
                      setCheckedValue={setCheckedValue}
                      colors={categories.map((category) => {
                        return {
                          name: category.name,
                          color: category.color,
                        };
                      })}
                    />
                    {categories.length === 0 && (
                      <LabelComponent htmlFor="incident-category">
                        {"Категории не загружены. Повторите попытку позже."}
                      </LabelComponent>
                    )}
                  </li>
                  <li className="list__item">
                    <InputComponent
                      type="text"
                      id="incident-title"
                      name="incident-title"
                      placeholder="Заголовок"
                      width={300}
                      required
                      disabled={categories.length === 0 || submitting}
                      value={title.value}
                      onChange={title.onChange}
                      onBlur={title.onBlur}
                    />
                    {getTitleErrorMessage() && (
                      <LabelComponent htmlFor="incident-title">
                        {getTitleErrorMessage()}
                      </LabelComponent>
                    )}
                  </li>
                  <li className="list__item">
                    <TextareaComponent
                      placeholder="Описание"
                      name="incident-description"
                      id="incident-description"
                      rows={6}
                      width={300}
                      maxLength={200}
                      disabled={categories.length === 0 || submitting}
                      value={description.value}
                      onChange={description.onChange}
                      onBlur={description.onBlur}
                    />
                    {getDescriptionErrorMessage() && (
                      <LabelComponent htmlFor="incident-description">
                        {getDescriptionErrorMessage()}
                      </LabelComponent>
                    )}
                  </li>
                  <li className="list__item form__button">
                    <ButtonComponent
                      type="submit"
                      className="button"
                      modalButton
                      disabled={
                        formSubmitting ||
                        submitting ||
                        categories.length === 0 ||
                        !title.inputValid
                      }
                    >
                      Отправить
                    </ButtonComponent>
                  </li>
                </ul>
              </FormComponent>
            </div>
          </ModalComponent>
        }
      </>
    );
  }
);
