import { Link } from "react-router-dom";
import { InputComponent } from "../../components/ui/input/input";
import styles from "./signup.module.scss";
import "../../index.scss";
import { FormComponent } from "../../components/ui/form/form";
import { ButtonComponent } from "../../components/ui/button/button";
import CustomCursorComponent from "../../components/customCursorComponent";
import ThemeStore from "../../stores/theme.store";
import useInput from "../../hooks/input.hook";
import { LabelComponent } from "../../components/ui/label/label";
import { SignUpDto } from "../../dto/signup.dto";
import { AuthService } from "../../services/auth.service";

export const SignUp: React.FC = () => {
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
    if (confirmPassword.isDirty && password.value !== confirmPassword.value) {
      confirmPassword.inputValid = false;
      return "Пароли не совпадают";
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

  const onSubmit = async () => {
    const data: SignUpDto = {
      email: email.value,
      password: password.value,
      name: name.value,
      surname: surname.value,
    };
    try {
      const response = await AuthService.postSignUp(data);
      console.log(response.data);
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  return (
    <main className={`${styles.main} user-select-none`}>
      <CustomCursorComponent highlight />
      <h1 className={`${styles.title} ${lightMode ? styles.text_shadow : ""}`}>
        Incidents
      </h1>
      <section className={styles.wrapper}>
        <FormComponent title="Регистрация">
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
              !surname.inputValid
            }
            type="button"
            onClick={onSubmit}
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
