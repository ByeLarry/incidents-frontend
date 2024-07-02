import { Link, useNavigate } from "react-router-dom";
import { FormComponent } from "../../components/ui/form/form";
import { InputComponent } from "../../components/ui/input/input";
import "../../index.scss";
import styles from "./signin.module.scss";
import { ButtonComponent } from "../../components/ui/button/button";
import CustomCursorComponent from "../../components/ui/cursor/customCursorComponent";
import { LabelComponent } from "../../components/ui/label/label";
import useInput from "../../hooks/input.hook";
import { SignInDto } from "../../dto/signin.dto";
import { AuthService } from "../../services/auth.service";
import { Toaster, toast } from "sonner";
import { AxiosError } from "axios";
import UserStore from "../../stores/user.store";
import { User } from "../../interfaces/IUser";
import csrfStore from "../../stores/csrf.store";

export const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const { changeUser } = UserStore;
  const email = useInput("", { email: true, minLength: 3, isEmpty: true });
  const password = useInput("", { minLength: 8, isEmpty: true });

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
      const response = await AuthService.postSignIn(data);
      changeUser(response.data as User);
      csrfStore.changeCsrf(response.data.csrf_token);
      navigate("/", { replace: true });
    } catch (error) {
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
    <main className={`${styles.main} user-select-none`}>
      <CustomCursorComponent highlight />
      <Toaster
        position="bottom-center"
        richColors
        toastOptions={{ duration: 4000 }}
      />
      <h1 className={`${styles.title}`}>Incidents</h1>
      <section className={`${styles.wrapper}`}>
        <FormComponent
          title="Вход"
          onSubmit={onSubmit}
        >
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
            disabled={!email.inputValid || !password.inputValid}
            type="submit"
          >
            Войти
          </ButtonComponent>
        </FormComponent>
        <div className={`${styles.link__wrapper}`}>
          <Link className="link" to="/signup">
            Зарегистрироваться
          </Link>
          <Link className="link" to="/">
            Главная страница
          </Link>
        </div>
      </section>
    </main>
  );
};
