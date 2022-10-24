import { useRef, useState, useEffect,useContext } from "react";
import { Button, Container, Input, Label } from "reactstrap";
import axios from "../../../Api/axios";
import endpoints from "../../../Api/endpoints.json";
import { useNavigate, useLocation } from "react-router-dom";
import AuthContext from "../../../Context/AuthContext";

const CreateCompany = () => {
    const userRef = useRef();
  const errRef = useRef();
  const [email = "", setEmail] = useState();
  const [name = "", setName] = useState();
  const [errMsg, setErrMsg] = useState(); 
  const navigate = useNavigate();
  const { auth,setAuth } = useContext(AuthContext);

  const doCreate = async (e) => {
    if(e)
{
  e.preventDefault();
}
    try {
      if(!email){
        setErrMsg('Email required');
        return;
      }
      
      const resp = await axios.post(
        endpoints.company.createCompany,
        JSON.stringify({ email,name }),
        {
          headers: { "Content-Type": "application/json","Authorization":"Bearer "+auth.token },
          withCredentials: false,
        }
      );
      if (resp.data.responseType===0) {
        alert("We sent a confirmation mail to "+email+".Please check and Activate your Company");
        navigate('/home');
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
      <h5 className="centerself">Please enter your company detail</h5>
      <br />
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <Label className="marginleft">Administrator Email</Label>
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
      <Label className="marginleft">Company Name</Label>
      <Input
        id="name"
        name="name"
        placeholder="Name"
        type="text"
        ref={userRef}
        onChange={(e) => setName(e.target.value)}
        value={name}
        required
        maxLength="50"
      />
      <Button
        className="btn btn-success margintop width-full"
        onClick={doCreate}
      >
        Create Company
      </Button>
      
    </div>
  </Container>
    );
};

export default CreateCompany;
