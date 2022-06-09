import Authentication from "./components/Authentication/Authentication";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Form from "./components/HomePage/Form";
import "./App.css";
import { createContext, useState } from "react";

export const AuthorizationContext = createContext(null);



function App() {
  const [userInfo, setUserInfo] = useState({
    token: localStorage.getItem("token") || "",
    userData: JSON.parse(localStorage.getItem("UserData")) || null,
  });

  return (
    <>
      <BrowserRouter>
        <AuthorizationContext.Provider value={{ userInfo, setUserInfo }}>
          <Routes>
            <Route path="/" element={<Authentication />} />
            <Route path="/homepage" element={<Form />} />
          </Routes>
        </AuthorizationContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
