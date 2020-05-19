import React from 'react';
import { Col, Row, Button, Form, FormGroup, Label, Input, NavLink, CardText } from 'reactstrap';
import '../../css/Login.css';

class Login extends React.Component {
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
    onRemember_meOnChange = () => {
        this.setState({
            remember_me: !this.state.remember_me
        })
    }
    onLogin = () => {
        this.props.submit(this.state)
    }
    render() {
        return (
            <>
                <Form className="form">
                    <CardText className="text-center txt-title">Login</CardText>
                    <Row form>
                        <Col md={12}>
                            <FormGroup>
                                <Label for="exampleEmail" className="label" >Username</Label>
                                <Input type="text"
                                    name="username"
                                    value={this.state.username}
                                    onChange={this.onUsernameOnChange}
                                    placeholder="Enter username" />
                            </FormGroup>
                        </Col>
                        <Col md={12}>
                            <FormGroup>
                                <Label className="label" for="examplePassword">Password</Label>
                                <Input onChange={this.onPasswordlOnChange}
                                    type="password"
                                    name="password"
                                    placeholder="Enter Password" />
                            </FormGroup>
                        </Col>
                    </Row>
                    <FormGroup check>
                        <Input type="checkbox" onChange={this.onRemember_meOnChange} />Remember me
                        <Label for="exampleCheck" check>Remember</Label>
                        <a href="#" className="link-forgot">forgot password?</a>
                    </FormGroup>
                    <Button className="w-100" color="primary" onClick={this.onLogin}>Login</Button>
                </Form></>
        );
    }
}

export default Login;