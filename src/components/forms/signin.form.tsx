import { memo, useState } from "react";
import { ButtonComponent } from "../ui/button/button";
import { FormComponent } from "../ui/form/form";
import { LabelComponent } from "../ui/label/label";
import { toast } from "sonner";
import { AxiosError, AxiosResponse } from "axios";
import csrfStore from "../../stores/csrf.store";
import { User } from "../../interfaces/IUser";
import { AuthService } from "../../services/auth.service";
import useInput from "../../hooks/useInput.hook";
import { useNavigate } from "react-router-dom";
import userStore from "../../stores/user.store";
import { InputComponent } from "../ui/input/input";
import { SignInDto } from "../../dto/signin.dto";

export const SignInForm: React.FC = memo(() => {
  const navigate = useNavigate();
  const { changeUser } = userStore;
  const email = useInput("", { email: true, minLength: 3, isEmpty: true });
  const password = useInput("", { minLength: 8, isEmpty: true });
  const [submitting, setSubmitting] = useState(false);
  const getEmailErrorMessage = () => {
    if (email.isDirty) {
      if (email.isEmpty) {
        return "Email не введён";
      } else if (email.emailError) {
        return "Email некорректный";
      } else if (email.minLengthError) {
        return "Длина должна быть больше 3 символов";
      }
    }
    return null;
  };

  const getPasswordErrorMessage = () => {
    if (password.isDirty) {
      if (password.isEmpty) {
        return "Пароль не введён";
      } else if (password.minLengthError) {
        return "Длина должна быть больше 8 символов";
      }
    }
    return null;
  };

  const onSubmit = async function (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data: SignInDto = {
      email: email.value,
      password: password.value,
    };
    try {
      setSubmitting(true);
      const response: AxiosResponse<User> = await AuthService.postSignIn(data);
      changeUser(response.data as User);
      csrfStore.changeCsrf(response.data.csrf_token);
      navigate("/", { replace: true });
      setSubmitting(false);
    } catch (error) {
      setSubmitting(false);
      if (error instanceof AxiosError) {
        switch (error.response?.status) {
          case 404:
            toast.error("Пользователь несуществует");
            break;
          case 401:
            toast.error("Неправильный пароль");
            break;
          case 500:
            toast.error("Произошла серверная ошибка");
            break;
          default:
            toast.error(
              error.response?.data.message || "Во время входа произошла ошибка"
            );
        }
      } else {
        toast.error("Произошла непредвиденная ошибка");
      }
    }
  };
  return (
    <>
      <FormComponent title="Вход" onSubmit={onSubmit}>
        <div className="form__item">
          <InputComponent
            type="email"
            placeholder="Email"
            value={email.value}
            id="email"
            name="email"
            onChange={email.onChange}
            onBlur={email.onBlur}
            required={true}
          />
          {getEmailErrorMessage() && (
            <LabelComponent htmlFor="email">
              {getEmailErrorMessage()}
            </LabelComponent>
          )}
        </div>
        <div className="form__item">
          <InputComponent
            type="password"
            placeholder="Пароль"
            value={password.value}
            id="password"
            name="password"
            onChange={password.onChange}
            onBlur={password.onBlur}
            required={true}
          />
          {getPasswordErrorMessage() && (
            <LabelComponent htmlFor="password">
              {getPasswordErrorMessage()}
            </LabelComponent>
          )}
        </div>

        <ButtonComponent
          disabled={!email.inputValid || !password.inputValid || submitting}
          type="submit"
        >
          Войти
        </ButtonComponent>
      </FormComponent>
    </>
  );
});
