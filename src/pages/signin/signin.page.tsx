import { Link } from "react-router-dom";
import { FormComponent } from "../../components/ui/form/form";
import { InputComponent } from "../../components/ui/input/input";
import "../../index.scss";
import styles from "./signin.module.scss";
import { ButtonComponent } from "../../components/ui/button/button";
import CustomCursorComponent from "../../components/customCursorComponent";
import { LabelComponent } from "../../components/ui/label/label";
import useInput from "../../hooks/input.hook";
import { SignInDto } from "../../dto/signin.dto";
import { AuthService } from "../../services/auth.service";

export const SignIn: React.FC = () => {
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

  const onSubmit = async function () {
    const data: SignInDto = {
      email: email.value,
      password: password.value,
    };
    try {
      const response = await AuthService.postSignIn(data);
      console.log(response);
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  return (
    <main className={`${styles.main}  user-select-none`}>
      <CustomCursorComponent highlight />
      <h1 className={`${styles.title}`}>Incidents</h1>
      <section className={`${styles.wrapper}`}>
        <FormComponent title="Вход">
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
            type="button"
            onClick={onSubmit}
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
