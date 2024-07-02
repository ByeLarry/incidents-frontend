import { Navigate, Route, Routes } from "react-router-dom";
import "./App.scss";
import { Home } from "../pages/home/home.page";
import { SignIn } from "../pages/signin/signin.page";
import { SignUp } from "../pages/signup/signup.page";
import { useEffect, useState } from "react";
import { AuthService } from "../services/auth.service";
import UserStore from "../stores/user.store";
import { User } from "../interfaces/IUser";
import { AxiosError } from "axios";
import { Toaster, toast } from "sonner";
import { ErrorPage } from "../pages/error/error.page";
import csrfStore from "../stores/csrf.store";

function App() {
  const { changeAllFields } = UserStore;
  const { csrf, changeCsrf } = csrfStore;
  const [auth, setAuth] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AuthService.getMe();
        changeAllFields(response.data as User);
        changeCsrf(response.data.csrf_token);
        setAuth(true);
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
  }, [changeAllFields, changeCsrf, csrf]);
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
            element={!auth ? <SignIn /> : <Navigate to="/" />}
          />
          <Route
            path="/signup"
            element={!auth ? <SignUp /> : <Navigate to="/" />}
          />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
