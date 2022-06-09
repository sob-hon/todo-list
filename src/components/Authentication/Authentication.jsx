import { useState } from "react";
import Register from "./Register/Register";
import Login from "./Login/Login";
import "./Authentication.css";

const Authentication = () => {
  const [registerState, setRegisterState] = useState("Register");

  const RegisterStateChangeHandler = (state) => {
    setRegisterState(state);
  };

  return (
    <div className="formContainer">
      <div className="formHeader">
        <div
          className={
            registerState === "Register" ? "headerActive" : "headerInActive"
          }
          onClick={() => RegisterStateChangeHandler("Register")}
        >
          <button className="headerButton"> Register </button>
        </div>
        <div
          className={
            registerState === "Register" ? "headerInActive" : "headerActive"
          }
          onClick={() => RegisterStateChangeHandler("Login")}
        >
          <button className="headerButton"> Login </button>
        </div>
      </div>
      <div className="formBody">
        {registerState === "Register" ? <Register /> : <Login />}
      </div>
    </div>
  );
};

export default Authentication;
