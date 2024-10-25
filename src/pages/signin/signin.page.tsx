import { Link } from "react-router-dom";
import "../../index.scss";
import styles from "./signin.module.scss";
import CustomCursorComponent from "../../components/cursor/custom-cursor-component";
import { SignInForm } from "../../components/forms/signin.form";
import { AuthProviders } from "../../components/auth-providers/auth-providers";

export const SignIn: React.FC = () => {
  return (
    <main className={`${styles.main} user-select-none`}>
      <CustomCursorComponent highlight />
      <h1 className={`${styles.title}`}>Incidents</h1>
      <section className={`${styles.wrapper}`}>
        <SignInForm />
        <AuthProviders />
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

export default SignIn;
