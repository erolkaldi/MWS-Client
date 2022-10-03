import { Component } from "react";
import { Button, Container, Input, Label } from "reactstrap";

class Login extends Component {
  state = {};
  render() {
    return (
      <Container className="center">
        <div className="login-container">
          <h3 className="centerself">Wellcome to MWS App</h3>
          <h5 className="centerself">Please enter your credentials</h5>
          <br />
          <Label className="marginleft">Email</Label>
          <Input id="email" name="email" placeholder="email" type="email" />
          <Label className="marginlefttop">Password</Label>
          <Input className="marginbottom"
            id="password"
            name="password"
            placeholder="password"
            type="password"
          />
          <Input type="checkbox" className="margintop"></Input> <Label check>Remember Me!</Label>
          <Button className="btn btn-success margintop width-full">
            Login
          </Button>
        </div>
      </Container>
    );
  }
}

export default Login;
