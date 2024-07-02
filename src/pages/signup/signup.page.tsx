import { Link } from "react-router-dom";
import { InputComponent } from "../../components/ui/input/input";
import styles from "./signup.module.scss";
import "../../index.scss";
import { FormComponent } from "../../components/ui/form/form";
import { ButtonComponent } from "../../components/ui/button/button";
import CustomCursorComponent from "../../components/ui/cursor/customCursorComponent";
import ThemeStore from "../../stores/theme.store";
import useInput from "../../hooks/input.hook";
import { LabelComponent } from "../../components/ui/label/label";
import { SignUpDto } from "../../dto/signup.dto";
import { AuthService } from "../../services/auth.service";
import { Toaster, toast } from "sonner";
import { AxiosError } from "axios";
import UserStore from "../../stores/user.store";
import { User } from "../../interfaces/IUser";
import { useNavigate } from "react-router-dom";
import csrfStore from "../../stores/csrf.store";

export const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const { changeUser } = UserStore;
  const { lightMode } = ThemeStore;
  const email = useInput("", { email: true, minLength: 3, isEmpty: true });
  const password = useInput("", { minLength: 8, isEmpty: true });
  const name = useInput("", { minLength: 3, isEmpty: true });
  const surname = useInput("", { minLength: 3, isEmpty: true });
  const confirmPassword = useInput("", { minLength: 8, isEmpty: true });
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

  const getConfirmPasswordErrorMessage = () => {
    if (confirmPassword.isDirty) {
      if (confirmPassword.isEmpty) {
        return "Подтверждение пароля не введено";
      } else if (
        confirmPassword.isDirty &&
        password.value.trim() !== confirmPassword.value.trim()
      ) {
        return "Пароли не совпадают";
      }
    }
    return null;
  };

  const getNameErrorMessage = () => {
    if (name.isDirty) {
      if (name.isEmpty) {
        return "Имя не введено";
      } else if (name.minLengthError) {
        return "Длина должна быть больше 3 символов";
      }
    }
    return null;
  };

  const getSurnameErrorMessage = () => {
    if (surname.isDirty) {
      if (surname.isEmpty) {
        return "Фамилия не введена";
      } else if (surname.minLengthError) {
        return "Длина должна быть больше 3 символов";
      }
    }
    return null;
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data: SignUpDto = {
      email: email.value,
      password: password.value,
      name: name.value,
      surname: surname.value,
    };
    try {
      const response = await AuthService.postSignUp(data);
      changeUser(response.data as User);
      csrfStore.changeCsrf(response.data.csrf_token);
      navigate("/", { replace: true });
    } catch (error) {
      if (error instanceof AxiosError) {
        switch (error.response?.status) {
          case 409:
            toast.error("Такой пользователь уже существует");
            break;
          case 500:
            toast.error("Произошла серверная ошибка");
            break;
          default:
            toast.error(
              error.response?.data.message ||
                "Во время регистрации произошла ошибка"
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
      <h1 className={`${styles.title} ${lightMode ? styles.text_shadow : ""}`}>
        Incidents
      </h1>
      <section className={styles.wrapper}>
        <FormComponent title="Регистрация" onSubmit={onSubmit}>
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
              type="text"
              placeholder="Имя"
              value={name.value}
              id="name"
              name="name"
              onChange={name.onChange}
              onBlur={name.onBlur}
              required={true}
            />
            {getNameErrorMessage() && (
              <LabelComponent htmlFor="name">
                {getNameErrorMessage()}
              </LabelComponent>
            )}
          </div>
          <div className="form__item">
            <InputComponent
              type="text"
              placeholder="Фамилия"
              value={surname.value}
              id="surname"
              name="surname"
              onChange={surname.onChange}
              onBlur={surname.onBlur}
              required={true}
            />
            {getSurnameErrorMessage() && (
              <LabelComponent htmlFor="surname">
                {getSurnameErrorMessage()}
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
          <div className="form__item">
            <InputComponent
              type="password"
              placeholder="Подтверждение пароля"
              value={confirmPassword.value}
              id="confirmPassword"
              name="confirmPassword"
              onChange={confirmPassword.onChange}
              onBlur={confirmPassword.onBlur}
              required={true}
            />
            {getConfirmPasswordErrorMessage() && (
              <LabelComponent htmlFor="confirmPassword">
                {getConfirmPasswordErrorMessage()}
              </LabelComponent>
            )}
          </div>
          <ButtonComponent
            disabled={
              !email.inputValid ||
              !password.inputValid ||
              !confirmPassword.inputValid ||
              !name.inputValid ||
              !surname.inputValid ||
              password.value.trim() !== confirmPassword.value.trim()
            }
            type="submit"
          >
            Войти
          </ButtonComponent>
        </FormComponent>
        <div className={styles.link__wrapper}>
          <Link className="link " to="/signin">
            Уже зарегистрированы?
          </Link>
          <Link className="link " to="/">
            Главная страница
          </Link>
        </div>
      </section>
    </main>
  );
};
