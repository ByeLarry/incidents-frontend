import { Link } from "react-router-dom";
import "../../index.scss";
import styles from "./signin.module.scss";
import CustomCursorComponent from "../../components/ui/cursor/customCursorComponent";
import { Toaster } from "sonner";
import { SignInForm } from "../../components/forms/signin.form";

export const SignIn: React.FC = () => {
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
        <SignInForm />
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
