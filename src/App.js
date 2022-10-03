
import { Link, Route, Routes } from 'react-router-dom';
import { Container,Row,Col } from 'reactstrap';
import './App.css';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import img1 from './images/img.png'
function App() {
  return (
    <Container className='App'>
      <Row className='nav'>
        <Col xs="6" className='pull-left'><img src={img1} alt=""></img><h3>MWS App</h3></Col>
       
        <Col xs="6" className='pull-right'><Link to="/login" className="btn btn-primary">Login</Link></Col>
      </Row>
      <Row className='nav'>
        <Col xl="1" sm="2"><Link to="/home" className="btn btn-primary">Home</Link></Col>
        <Col xl="1" sm="2"><Link to="/settings" className="btn btn-primary">Settings</Link></Col>
      </Row>
      <Row>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
        </Routes>
      </Row>
    </Container>
  );
}

export default App;
