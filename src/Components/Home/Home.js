import { useRef, useState, useEffect, useContext } from "react";
import { Button, Container, Input, Label } from "reactstrap";
import axios from "../../Api/axios";
import endpoints from "../../Api/endpoints.json";
import { useNavigate, useLocation } from "react-router-dom";
import AuthContext from "../../Context/AuthContext";
const Home = () => {
  const errRef = useRef();

  const [errMsg, setErrMsg] = useState();
  const [selectedCompany,setCompany]=useState('');
  const { auth, setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const sendRequest = async (e) => {
    if (e) {
      e.preventDefault();
    }
    try {
      const resp = await axios.post(endpoints.login, JSON.stringify({}), {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        },
        withCredentials: false,
      });
      if (resp.data.success) {
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
  const [companies,setCompanies]=useState([]);
useEffect( ()=>{
  async function fetchData(){
    const resp = await axios.get(
      endpoints.getCompanies,
      {
        headers: { "Content-Type": "application/json","Authorization":"Bearer "+auth.token },
        withCredentials: false,
      }
    );
    setCompanies([...resp.data.data]);
  }
    
      fetchData();
  },[auth.token]);
  const goToCreate = (e) => {
    if (e) {
      e.preventDefault();
    }
    navigate("createcompany");
  };
  return (
    <Container className="center">
      <div className="login-container" hidden={auth.companyId===""}>
    <Label for="exampleSelect">
      Company
    </Label>
    <Input
      id="companySelect"
      name="companySelect"
      type="select"
      value={selectedCompany}
      onChange={(e)=> setCompany(e.target.value)}
      
    >
      {
        companies.length>0 ? 
        companies.map(opt=><option value={opt.id} key={opt.id}>{opt.name}</option>)
        : <option></option>
      }
      
    </Input>
        <Button
          name="request"
          id="request"
          className="btn btn-success margintop width-full"
          onClick={sendRequest}
        >
          Send Request
        </Button>
        <Button
          name="create"
          id="create"
          className="btn btn-primary margintop width-full"
          onClick={goToCreate}
        >
          Or create your own company
        </Button>
      </div>
    </Container>
  );
};

export default Home;
