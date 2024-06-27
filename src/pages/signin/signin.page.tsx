import { Link } from "react-router-dom";
import { FormComponent } from "../../components/ui/form/form";
import { InputComponent } from "../../components/ui/input/input";
import "../../index.scss";
import styles from "./signin.module.scss";
import { ButtonComponent } from "../../components/ui/button/button";
import CustomCursorComponent from "../../components/customCursorComponent";

export const SignIn: React.FC = () => {
  return (
    <main className={`${styles.main} cursor_none user-select-none`}>
      <CustomCursorComponent highlight cursor />
      <h1 className={`${styles.title} `}>Incidents</h1>
      <section className={`${styles.wrapper} `}>
        <FormComponent title="Вход" action="/signin">
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
            type="password"
            placeholder="Пароль"
            value=""
            id="password"
            name="password"
          />
          <ButtonComponent className="cursor_none" type="submit">
            Войти
          </ButtonComponent>
        </FormComponent>
        <div className={`${styles.link__wrapper}`}>
          <Link className="link cursor_none" to="/signup">
            Зарегистрироваться
          </Link>
          <Link className="link cursor_none" to="/">
            Главная страница
          </Link>
        </div>
      </section>
    </main>
  );
};
