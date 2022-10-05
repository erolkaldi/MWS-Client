import { useRef, useState, useEffect,useContext } from "react";
import { Button, Container, Input, Label } from "reactstrap";
import axios from "../../Api/axios";
import endpoints from "../../Api/endpoints.json";
import { useNavigate, useLocation } from "react-router-dom";
import AuthContext from "../../Context/AuthContext";
const Login = () => {
  const userRef = useRef();
  const errRef = useRef();
  const [email = "", setEmail] = useState();
  const [password = "", setPassword] = useState();
  const [remember = false, setRemember] = useState();
  const [errMsg, setErrMsg] = useState();
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  useEffect(() => {
    if (userRef.current) {
      userRef.current.focus();
    }
  }, []);
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      doLogin();
    }
  }
  useEffect(() => {
    setErrMsg("");
  }, [email, password]);
  const doLogin = async (e) => {
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
        endpoints.login,
        JSON.stringify({ email, password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: false,
        }
      );
      if (resp.data.success) {
        setAuth({
          token: resp.data.accessToken,
          isLoggedIn: true,
          email: email,
        });
        navigate(from);
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
      <div className="login-container">
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
        <Label className="marginlefttop">Password</Label>
        <Input
          className="marginbottom"
          id="password"
          name="password"
          placeholder="Password"
          type="password"
          ref={userRef}
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
          onKeyDown={handleKeyDown}
        />
        <Input
          type="checkbox"
          className="margintop"
          ref={userRef}
          onChange={(e) => setRemember(e.target.value)}
          value={remember}
        ></Input>{" "}
        <Label check>Remember me!</Label>
        <Button
          className="btn btn-success margintop width-full"
          onClick={doLogin}
        >
          Login
        </Button>
        <span className="margintop">
          <a href="/register">Register here</a>
        </span>
      </div>
    </Container>
  );
};

export default Login;
