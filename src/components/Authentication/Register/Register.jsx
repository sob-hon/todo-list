import "./Register.css"

const Register = () => {
  return (
    <div className="signUpContainer">

      <h1 className="headerText">Join Us Today</h1>

      <div className="inputSection">
        <input type="text" className="firstName" required />
        <label className="inputLabel">Name</label>
      </div>

      <div className="inputSection">
        <input type="text" className="age" required />
        <label className="inputLabel">Age</label>
      </div>

      <div className="inputSection">
        <input type="text" className="emailAddress" required />
        <label className="inputLabel">Email Address</label>
      </div>

      <div className="inputSection">
        <input type="password" className="password" required />
        <label className="inputLabel">Password</label>
      </div>
    </div>
  );
};

export default Register;
