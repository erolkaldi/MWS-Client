import { Link, Route, Routes } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import "./App.css";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import Navigation from "./Components/Navigation/Navigation";
import Register from "./Components/Register/Register";
import img1 from "./images/img.png";
import AuthContext from "./Context/AuthContext";
import { useContext } from "react";
import Layout from "./Components/Shared/Layout";
import NotFound from "./Components/Shared/NotFound";
import RequireAuth from "./Components/Shared/RequireAuth";
function App() {
  const { auth, setAuth } = useContext(AuthContext);
  const doLogout = () => {
    setAuth({ isLoggedIn: false });
  };
  return (
    <Container className="App">
      <Row className="nav">
        <Col xs="6" className="pull-left">
          <img src={img1} alt=""></img>
          <h3>MWS App</h3>
        </Col>
        <Col xs="6" className="pull-right">
          <Link
            to="/login"
            className="btn btn-primary"
            hidden={auth.isLoggedIn}
          >
            Login
          </Link>
          <Link
            to="/login"
            className="btn btn-danger"
            hidden={auth.isLoggedIn === false}
            onClick={doLogout}
          >
            Logout
          </Link>
        </Col>
      </Row>
      <Row className="nav2" hidden={auth.isLoggedIn === false}>
        <Navigation></Navigation>
      </Row>
      <Row>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route element={<RequireAuth />}>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Row>
    </Container>
  );
}

export default App;
