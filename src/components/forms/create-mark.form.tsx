import { ButtonComponent } from "../ui/button/button";
import { FormComponent } from "../ui/form/form";
import { LabelComponent } from "../ui/label/label";
import useInput from "../../libs/hooks/input.hook";
import userStore from "../../stores/user.store";
import { CreateMarkDto } from "../../libs/dto/create-mark.dto";
import { LngLat } from "@yandex/ymaps3-types";
import { categoryIdFromValue } from "../../libs/helpers/category-id-from-value";
import { SelectComponent } from "../ui/select/select";
import { InputComponent } from "../ui/input/input";
import { TextareaComponent } from "../ui/textarea/textarea";
import { CategoryDto } from "../../libs/dto/categories.dto";
import { useCreateMark } from "../../libs/hooks/create-mark.hook";
import { ValidationErrorMessages } from "../../libs/helpers/validation-error-messages";
import closeCandidateMarkFormCallbackStore from "../../stores/close-candidate-mark-form-callback.store";
import { observer } from "mobx-react-lite";

interface Props {
  submitting: boolean;
  setCheckedValue: React.Dispatch<React.SetStateAction<string | undefined>>;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  categories: CategoryDto[];
  checkedValue?: string;
  coords: [number, number] | LngLat;
}

export const CreateMarkForm: React.FC<Props> = observer((props: Props) => {
  const title = useInput("", { minLength: 3, isEmpty: true, maxLength: 100 });
  const description = useInput("", { maxLength: 199 });
  const { user } = userStore;
  const { createMark, isPendingCreateMark } = useCreateMark();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newMark: CreateMarkDto = {
      userId: user?._id as string,
      lat: props.coords[1],
      lng: props.coords[0],
      title: title.value,
      description: description.value,
      categoryId: categoryIdFromValue(
        props.checkedValue as string,
        props.categories
      ) as number,
    };
    createMark(newMark);
    title.setDirty(false);
    description.setDirty(false);
    closeCandidateMarkFormCallbackStore.callback();
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
            {ValidationErrorMessages.getTitleErrorMessage(title) && (
              <LabelComponent htmlFor="incident-title">
                {ValidationErrorMessages.getTitleErrorMessage(title)}
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
            {ValidationErrorMessages.getDescriptionErrorMessage(
              description
            ) && (
              <LabelComponent htmlFor="incident-description">
                {ValidationErrorMessages.getDescriptionErrorMessage(
                  description
                )}
              </LabelComponent>
            )}
          </li>
          <li className="list__item form__button">
            <ButtonComponent
              type="submit"
              modalButton
              disabled={
                isPendingCreateMark ||
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
