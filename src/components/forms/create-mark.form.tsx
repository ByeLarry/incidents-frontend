import { memo, useState } from "react";
import { ButtonComponent } from "../ui/button/button";
import { FormComponent } from "../ui/form/form";
import { LabelComponent } from "../ui/label/label";
import useInput from "../../hooks/input.hook";
import userStore from "../../stores/user.store";
import csrfStore from "../../stores/csrf.store";
import { CreateMarkDto } from "../../dto/create-mark.dto";
import { LngLat } from "@yandex/ymaps3-types";
import { categoryIdFromValue } from "../../utils/categoryIdFromValue";
import { MarksService } from "../../services/marks.service";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { SelectComponent } from "../ui/select/select";
import { InputComponent } from "../ui/input/input";
import { TextareaComponent } from "../ui/textarea/textarea";
import { CategoryDto } from "../../dto/categories.dto";

interface Props {
  submitting: boolean;
  setCheckedValue: React.Dispatch<React.SetStateAction<string | undefined>>;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  propsCallback?: () => void;
  categories: CategoryDto[];
  checkedValue?: string;
  coords: [number, number] | LngLat;
}

export const CreateMarkForm: React.FC<Props> = memo((props: Props) => {
  const title = useInput("", { minLength: 3, isEmpty: true, maxLength: 100 });
  const description = useInput("", { maxLength: 199 });
  const { user } = userStore;
  const { csrf } = csrfStore;
  const [formSubmitting, setFormSubmitting] = useState(false);

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

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setFormSubmitting(true);
      const data: CreateMarkDto = {
        userId: user?._id as string,
        csrf_token: csrf,
        lat: props.coords[1],
        lng: props.coords[0],
        title: title.value,
        description: description.value,
        categoryId: categoryIdFromValue(
          props.checkedValue as string,
          props.categories
        ) as number,
      };
      await MarksService.postCreateMark(data);
      setFormSubmitting(false);
      title.setDirty(false);
      description.setDirty(false);
      if (props.propsCallback) props.propsCallback();
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
    props.setModalOpen(false);
    title.setValue("");
    description.setValue("");
  };
  return (
    <>
      <FormComponent noStyle onSubmit={onSubmit}>
        <ul className="form__list">
          <li className="list__item">
            <SelectComponent
              id="incident-category"
              name="incident-category"
              values={props.categories.map((category) => category.name)}
              width={300}
              disabled={props.categories.length === 0 || props.submitting}
              setCheckedValue={props.setCheckedValue}
              colors={props.categories.map((category) => {
                return {
                  name: category.name,
                  color: category.color,
                };
              })}
            />
            {props.categories.length === 0 && (
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
              disabled={props.categories.length === 0 || props.submitting}
              value={title.value}
              onChange={title.onChange}
              onBlur={title.onBlur}
              autoComplete="off"
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
              disabled={props.categories.length === 0 || props.submitting}
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
                props.submitting ||
                props.categories.length === 0 ||
                !title.inputValid
              }
            >
              Отправить
            </ButtonComponent>
          </li>
        </ul>
      </FormComponent>
    </>
  );
});
