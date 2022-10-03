import { Component } from "react";
import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap";

class Login extends Component {
  state = {};
  render() {
    return (
      <Container className="center">
          <Form className="login-container">
            <FormGroup>
              <Label for="exampleEmail">Email</Label>
              <Input
                id="exampleEmail"
                name="email"
                placeholder="with a placeholder"
                type="email"
              />
            </FormGroup>
            <FormGroup>
              <Label for="examplePassword">Password</Label>
              <Input
                id="examplePassword"
                name="password"
                placeholder="password placeholder"
                type="password"
              />
            </FormGroup>
          </Form>
      </Container>
    );
  }
}

export default Login;
