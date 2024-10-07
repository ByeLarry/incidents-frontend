import { Link } from "react-router-dom";
import styles from "./signup.module.scss";
import "../../index.scss";
import CustomCursorComponent from "../../components/cursor/custom-cursor-component";
import ThemeStore from "../../stores/theme.store";
import { SignUpForm } from "../../components/forms/signup.form";
import { AuthProviders } from "../../components/auth-providers/auth-providers";

export const SignUp: React.FC = () => {
  const { lightMode } = ThemeStore;
 
  return (
    <main className={`${styles.main} user-select-none`}>
      <CustomCursorComponent highlight />
      <h1 className={`${styles.title} ${lightMode ? styles.text_shadow : ""}`}>
        Incidents
      </h1>
      <section className={styles.wrapper}>
        <SignUpForm />
        <AuthProviders />
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
