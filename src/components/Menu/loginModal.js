import React from 'react';
import { Button, Form, FormGroup, Label, Input, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';


class LoginModal extends React.Component {
  state = {
    username: "",
    password: "",
    remember_me: false,
  }
  onUsernameOnChange = (event) => {
    this.setState({
      username: event.target.value
    })
  }
  onPasswordlOnChange = (event) => {
    this.setState({
      password: event.target.value
    })
  }

  onLogin = () => {
    this.props.submit(this.state)
  }

  render() {
    return (
      <Modal
        isOpen={this.props.visible}
        className={this.props.className}
      >
        <ModalHeader toggle={this.toggle}>Login</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label>
                Username
              </Label>
              <Input
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.onUsernameOnChange}
                placeholder="Enter username"
              />
            </FormGroup>
            <FormGroup>
              <Label>
                Password
              </Label>
              <Input
                onChange={this.onPasswordlOnChange}
                type="password"
                name="password"
                placeholder="Enter Password"
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.onLogin}>
            Login
          </Button>
          <Button color="secondary" onClick={this.props.onToggle}>
            Cancel
          </Button>
          <br></br>
        </ModalFooter>
      </Modal>
    );
  }
}

export default LoginModal;