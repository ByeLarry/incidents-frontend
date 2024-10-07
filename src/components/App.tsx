import { Navigate, Route, Routes } from "react-router-dom";
import "./App.scss";
import { Home } from "../pages/home/home.page";
import { SignIn } from "../pages/signin/signin.page";
import { SignUp } from "../pages/signup/signup.page";
import { useEffect } from "react";
import UserStore from "../stores/user.store";
import { Toaster, toast } from "sonner";
import { ErrorPage } from "../pages/error/error.page";
import { observer } from "mobx-react-lite";
import { useGetUser } from "../libs/hooks/get-user.hook";
import { SuccessAuthPage } from "../pages/success-auth/success-auth.page";

const App = observer(() => {
  const { user, changeUser } = UserStore;
  const { mutateGetUser, userdata, isSuccessGetUser } = useGetUser();

  useEffect(() => {
    mutateGetUser();
  }, [mutateGetUser]);

  useEffect(() => {
    if (isSuccessGetUser && userdata) {
      changeUser(userdata.data);
    } else {
      changeUser(null);
    }
  }, [changeUser, isSuccessGetUser, userdata]);

  useEffect(() => {
    console.log("user ", user);
    if (!user || user.activated === undefined) return;
    if (user.activated === false) {
      toast.info("Почта не подтверждена");
    }
  }, [user]);

  return (
    <>
      <div className="App">
        <Toaster
          position="top-center"
          richColors
          closeButton
          toastOptions={{ duration: Infinity }}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/success" element={<SuccessAuthPage />} />
          <Route
            path="/signin"
            element={!user ? <SignIn /> : <Navigate to="/" />}
          />
          <Route
            path="/signup"
            element={!user ? <SignUp /> : <Navigate to="/" />}
          />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
    </>
  );
});

export default App;
