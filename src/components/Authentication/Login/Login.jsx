import "./Login.css"

const Login = () => {
  return (
    <>
      <h1 className="headerText">Welcome Back</h1>

      <div className="inputSection">
        <input type="email" className="emailAddress" required />
        <label className="inputLabel">Email</label>
      </div>

      <div className="inputSection">
        <input type="text" className="password" required />
        <label className="inputLabel">Password</label>
      </div>
    </>
  );
};

export default Login;
