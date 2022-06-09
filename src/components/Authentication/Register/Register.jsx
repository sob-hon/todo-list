import { useRef } from "react";
import "./Register.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUserInfo } from "../../../App";

const Register = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const ageRef = useRef();
  const nameRef = useRef();
  const navigate = useNavigate();
  const context = useUserInfo();

  const RegisterBtnClickedHandler = () => {
    const regBody = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      age: parseInt(ageRef.current.value),
    };
    axios
      .post("http://185.126.200.101:4005/users", regBody)
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
      <h1 className="headerText">Join Us Today</h1>

      <div className="inputSection">
        <input type="text" className="firstName" required ref={nameRef} />
        <label className="inputLabel">Name</label>
      </div>

      <div className="inputSection">
        <input type="text" className="age" required ref={ageRef} />
        <label className="inputLabel">Age</label>
      </div>

      <div className="inputSection">
        <input type="text" className="emailAddress" required ref={emailRef} />
        <label className="inputLabel">Email Address</label>
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
        <button className="saveForm" onClick={RegisterBtnClickedHandler}>
          Register
        </button>
      </div>
    </>
  );
};

export default Register;
