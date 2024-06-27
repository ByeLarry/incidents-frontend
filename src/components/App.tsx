import { Route, Routes } from "react-router-dom";
import "./App.scss";
import { Home } from "../pages/home/home.page";
import { SignIn } from "../pages/signin/signin.page";
import { SignUp } from "../pages/signup/signup.page";

function App() {
  return (
    <>
    <div className="App">
       <Routes>
        <Route path="*" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes> 
    </div>
    
    </>
  );
}

export default App;
