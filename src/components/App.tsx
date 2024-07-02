import { Route, Routes } from "react-router-dom";
import "./App.scss";
import { Home } from "../pages/home/home.page";
import { SignIn } from "../pages/signin/signin.page";
import { SignUp } from "../pages/signup/signup.page";
import { useEffect } from "react";
import { AuthService } from "../services/auth.service";
import UserStore from "../stores/user.store";
import { User } from "../interfaces/IUser";
import { AxiosError } from "axios";
import { Toaster, toast } from "sonner";
import { ErrorPage } from "../pages/error/error.page";

function App() {
  const { changeAllFields } = UserStore;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AuthService.getMe();
        changeAllFields(response.data as User);
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
  }, [changeAllFields]);
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
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
