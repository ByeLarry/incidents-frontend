import { Navigate, Route, Routes } from "react-router-dom";
import "./App.scss";
import { useEffect } from "react";
import UserStore from "../stores/user.store";
import { Toaster, toast } from "sonner";
import { observer } from "mobx-react-lite";
import { useGetUser } from "../libs/hooks/get-user.hook";
import {
  ErrorPageLazy,
  HomeLazy,
  SignInLazy,
  SignUpLazy,
  SuccessAuthPageLazy,
} from "../lazy-pages";

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
          <Route path="/" element={<HomeLazy />} />
          <Route path="/success" element={<SuccessAuthPageLazy />} />
          <Route
            path="/signin"
            element={!user ? <SignInLazy /> : <Navigate to="/" />}
          />
          <Route
            path="/signup"
            element={!user ? <SignUpLazy /> : <Navigate to="/" />}
          />
          <Route path="*" element={<ErrorPageLazy />} />
        </Routes>
      </div>
    </>
  );
});

export default App;
