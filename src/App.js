import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyle from "./assets/styles/GlobalStyle";
import Login from "./pages/LoginPage/Login";
import SignUp from "./pages/SignUpPage/SignUp";
import { useState } from "react";
import UserContext from "./context/UserContext";
import Plans from "./pages/PlansPage/Plans";
import ListPlan from "./pages/PlansPage/ListPlan";
import Home from "./pages/HomePage/Home";
function App() {

  const tokenOnLocalStorage = localStorage.getItem("token");
  const nameOnLocalStorage = localStorage.getItem("name")
  const [token, setToken] = useState(tokenOnLocalStorage);
  const [name, setName] = useState(nameOnLocalStorage);

  function setPersistToken(token){
    setToken(token);
    localStorage.setItem("token",token);
  }
  function setPersistName(name){
    setName(name);
    localStorage.setItem("name",name);
  }
  return (
    <UserContext.Provider value={{ token, setPersistToken, setPersistName,name}}>
      <BrowserRouter>
        <GlobalStyle />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/subscripitions" element={<Plans/>} />
          <Route path="/subscripitions/:idPlan" element={<ListPlan/>}/>
          <Route path="/home" element={<Home/>}/>

        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
