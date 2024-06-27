import { Link } from "react-router-dom";
import { InputComponent } from "../../components/ui/input/input";
import styles from "./signup.module.scss";
import "../../index.scss";
import { FormComponent } from "../../components/ui/form/form";
import { ButtonComponent } from "../../components/ui/button/button";
import CustomCursorComponent from "../../components/customCursorComponent";
import ThemeStore from "../../stores/theme-store";

export const SignUp: React.FC = () => {
  const { lightMode } = ThemeStore;

  return (
    <main className={`${styles.main} cursor_none user-select-none`}>
      <CustomCursorComponent highlight cursor />
      <h1 className={`${styles.title} ${ lightMode ? styles.text_shadow : "" }`}>Incidents</h1>
      <section className={styles.wrapper}>
        <FormComponent title="Регистрация" action="/signin">
          <InputComponent
            className="cursor_none"
            type="email"
            placeholder="Email"
            value=""
            id="email"
            name="email"
          />
          <InputComponent
            className="cursor_none"
            type="text"
            placeholder="Имя"
            value=""
            id="name"
            name="name"
          />
          <InputComponent
            className="cursor_none"
            type="text"
            placeholder="Фамилия"
            value=""
            id="surname"
            name="surname"
          />
          <InputComponent
            className="cursor_none"
            type="password"
            placeholder="Пароль"
            value=""
            id="password"
            name="password"
          />
          <InputComponent
            className="cursor_none"
            type="password"
            placeholder="Подтверждение пароля"
            value=""
            id="confirmPassword"
            name="confirmPassword"
          />
          <ButtonComponent className="cursor_none" type="submit">
            Войти
          </ButtonComponent>
        </FormComponent>
        <div className={styles.link__wrapper}>
          <Link className="link cursor_none" to="/signin">
            Уже зарегистрированы?
          </Link>
          <Link className="link cursor_none" to="/">
            Главная страница
          </Link>
        </div>
      </section>
    </main>
  );
};
