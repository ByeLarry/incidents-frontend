import { LngLat, SearchResponse } from "@yandex/ymaps3-types";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { CategoryDto, CreateMarkDto } from "../../dto";
import { categoryIdFromValue, ValidationErrorMessages } from "../../helpers";
import { useCreateMark } from "../../hooks";
import useInput from "../../hooks/input.hook";
import closeCandidateMarkFormCallbackStore from "../../stores/close-candidate-mark-form-callback.store";
import userStore from "../../stores/user.store";
import { MEDIUM_SIZE_MARKER } from "../../utils";
import { ButtonComponent } from "../ui/button/button";
import { FormComponent } from "../ui/form/form";
import { InputComponent } from "../ui/input/input";
import { LabelComponent } from "../ui/label/label";
import { SelectComponent } from "../ui/select/select";
import { Spinner } from "../ui/spinner/spinner";
import { TextareaComponent } from "../ui/textarea/textarea";

interface Props {
  submitting: boolean;
  setCheckedValue: React.Dispatch<React.SetStateAction<string | undefined>>;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  categories: CategoryDto[];
  checkedValue?: string;
  coords: LngLat;
}

export const CreateMarkForm: React.FC<Props> = observer((props: Props) => {
  const title = useInput("", { minLength: 3, isEmpty: true, maxLength: 100 });
  const description = useInput("", { maxLength: 199 });
  const { user } = userStore;
  const { createMark } = useCreateMark();
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setSubmitting(true);
    e.preventDefault();
    const addresses: SearchResponse = await ymaps3.search({
      text: props.coords.toLocaleString(),
    });
    const newMark: CreateMarkDto = {
      userId: user?.id as string,
      lat: props.coords[1],
      lng: props.coords[0],
      title: title.value,
      description: description.value,
      address: addresses[0].properties ?? null,
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
    setSubmitting(false);
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
                  color: category.color ?? "",
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
              ariaLabel="Отправить"
              modalButton
              disabled={
                submitting ||
                props.submitting ||
                props.categories.length === 0 ||
                !title.inputValid
              }
            >
              {!submitting ? (
                "Отправить"
              ) : (
                <Spinner visible={true} size={MEDIUM_SIZE_MARKER} lightMode />
              )}
            </ButtonComponent>
          </li>
        </ul>
      </FormComponent>
    </>
  );
});
