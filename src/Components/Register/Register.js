import { useRef, useState, useEffect,useContext } from "react";
import { Button, Container, Input, Label } from "reactstrap";
import axios from "../../Api/axios";
import endpoints from "../../Api/endpoints.json";
import { useNavigate, useLocation } from "react-router-dom";
import AuthContext from "../../Context/AuthContext";

const Register = () => {
    const userRef = useRef();
  const errRef = useRef();
  const [email = "", setEmail] = useState();
  const [name = "", setName] = useState();
  const [password = "", setPassword] = useState();
  const [confirmPassword = "", setConfirmPassword] = useState();
  const [fullName = "", setFullName] = useState();
  const [errMsg, setErrMsg] = useState(); 
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);

  const doRegister = async (e) => {
    if(e)
{
  e.preventDefault();
}
    try {
      if(!email){
        setErrMsg('Email required');
        return;
      }
      if(!password){
        setErrMsg('Password required');
        return;
      }
      const resp = await axios.post(
        endpoints.register,
        JSON.stringify({ email,name,fullName, password,confirmPassword }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: false,
        }
      );
      if (resp.data.responseType===0) {
        setAuth({email:email});
        alert("We sent you a confirmation mail.Please check your email \r\n.Navigating to Login...");
        navigate('/login');
      } else {
        setErrMsg(resp.data.message);
      }
    } catch (err) {
      if (err?.response) {
        setErrMsg("No server response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing values");
      } else {
        setErrMsg(err.message);
      }
      errRef.current.focus();
    }
  };
  return (
    <Container className="center">
    <div className="register-container">
      <h3 className="centerself">Wellcome to MWS App</h3>
      <h5 className="centerself">Please enter your credentials</h5>
      <br />
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <Label className="marginleft">Email</Label>
      <Input
        id="email"
        name="email"
        placeholder="Email"
        type="email"
        ref={userRef}
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        required
      />
      <Label className="marginleft">Name</Label>
      <Input
        id="name"
        name="name"
        placeholder="Name"
        type="text"
        ref={userRef}
        onChange={(e) => setName(e.target.value)}
        value={name}
        required
        maxLength="20"
      />
      <Label className="marginleft">Full Name</Label>
      <Input
        id="fullName"
        name="fullName"
        placeholder="Full Name"
        type="text"
        ref={userRef}
        onChange={(e) => setFullName(e.target.value)}
        value={fullName}
        required
      />
      <Label className="marginlefttop">Password</Label>
      <Input
        id="password"
        name="password"
        placeholder="Password"
        type="password"
        ref={userRef}
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        required
      />
      <Label className="marginlefttop">Confirm Password</Label>
      <Input
        className="marginbottom"
        id="confirmPassword"
        name="confirmPassword"
        placeholder="Confirm Password"
        type="password"
        ref={userRef}
        onChange={(e) => setConfirmPassword(e.target.value)}
        value={confirmPassword}
        required
      />
      <Button
        className="btn btn-success margintop width-full"
        onClick={doRegister}
      >
        Register
      </Button>
      <span className="margintop">
          <a href="/login">Allready have an account? Login here</a>
        </span>
    </div>
  </Container>
    );
};

export default Register;
