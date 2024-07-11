import { Navigate, Route, Routes } from "react-router-dom";
import "./App.scss";
import { Home } from "../pages/home/home.page";
import { SignIn } from "../pages/signin/signin.page";
import { SignUp } from "../pages/signup/signup.page";
import { useEffect } from "react";
import { AuthService } from "../services/auth.service";
import UserStore from "../stores/user.store";
import { User } from "../interfaces/IUser";
import { AxiosError, AxiosResponse } from "axios";
import { Toaster, toast } from "sonner";
import { ErrorPage } from "../pages/error/error.page";
import csrfStore from "../stores/csrf.store";
import { observer } from "mobx-react-lite";

const App = observer(() => {
  const { user, changeUser } = UserStore;
  const { csrf, changeCsrf } = csrfStore;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: AxiosResponse<User> = await AuthService.getMe();
        changeUser(response.data);
        changeCsrf(response.data.csrf_token);
      } catch (error) {
        if (error instanceof AxiosError) {
          switch (error.response?.status) {
            case 419:
              toast.info("Срок действия предыдущей сессии истек");
              break;
            default:
              break;
          }
        }
      }
    };

    fetchData();
  }, [changeUser, changeCsrf]);

  useEffect(() => {
    if (!user || user.activated === undefined) return;
    if (user.activated === false) {
      toast.info("Почта не подтверждена");
    }
  }, [user]);
  return (
    <>
      <div className="App">
        <Toaster
          position="bottom-center"
          richColors
          toastOptions={{ duration: 5000 }}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/signin"
            element={!csrf && !user ? <SignIn /> : <Navigate to="/" />}
          />
          <Route
            path="/signup"
            element={!csrf && !user ? <SignUp /> : <Navigate to="/" />}
          />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
    </>
  );
});

export default App;
