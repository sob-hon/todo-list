import { useRef } from "react";
import "./Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUserInfo } from "../../../App";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const context = useUserInfo();

  const LoginBtnClickedHandler = () => {
    const headers = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    axios
      .post("http://185.126.200.101:4005/users/login", headers)
      .then((res) => {
        context.setUserInfo({
          token: res.data.token,
          userData: res.data.user,
        });
        localStorage.setItem("token", JSON.stringify(res.data.token));
        localStorage.setItem("UserData", JSON.stringify(res.data.user));
        navigate("/homepage");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <h1 className="headerText">Welcome Back</h1>

      <div className="inputSection">
        <input type="email" className="emailAddress" required ref={emailRef} />
        <label className="inputLabel">Email</label>
      </div>

      <div className="inputSection">
        <input
          type="password"
          className="password"
          required
          ref={passwordRef}
        />
        <label className="inputLabel">Password</label>
      </div>
      <div className="formFooter">
        <button className="saveForm" onClick={LoginBtnClickedHandler}>
          Login
        </button>
      </div>
    </>
  );
};

export default Login;
