import React, { Component } from 'react';
import { Label, Input, Form, Row, Col, FormGroup, Button } from 'reactstrap';
import axios from 'axios';

export default class Create extends Component {
    state = {
        username: "",
        password: "",
        name: "",
        gender: "",
        email: "",
        phone: "",
        address: "",
        position: "",
        age: "",
        roles: "",
        loading: false,
        agreeRoles: false,
    }
    onUsernameOnChange = (event) => {
        this.setState({
            username: event.target.value
        })
    }

    onNameOnChange = (event) => {
        this.setState({
            name: event.target.value
        })
    }

    onAgeOnChange = (event) => {
        this.setState({
            age: event.target.value
        })
    }

    onGenderOnChange = (event) => {
        this.setState({
            gender: event.target.value
        })
    }

    onPasswordlOnChange = (event) => {
        this.setState({
            password: event.target.value
        })
    }

    onRolesOnChange = (event) => {
        this.setState({
            roles: event.target.value
        })
    }

    onEmailOnChange = (event) => {
        this.setState({
            email: event.target.value
        })
    }

    onPhoneOnChange = (event) => {
        this.setState({
            phone: event.target.value
        })
    }

    onAddressOnChange = (event) => {
        this.setState({
            address: event.target.value
        })
    }

    onPositionOnChange = (event) => {
        this.setState({
            position: event.target.value
        })
    }

    onAgreeRolesOnChange = () => {
        this.setState({
            agreeRoles: !this.state.agreeRoles
        })
    }

    toggleLoading = () => {
        this.setState({
            loading: !this.state.loading
        })
    }

    reset = () => {
        this.setState({
            username: "",
            password: "",
            name: "",
            gender: "",
            email: "",
            phone: "",
            address: "",
            position: "",
            age: "",
            agreeRoles: false,
        })
    }

    createUser = async event => {
        event.preventDefault();
        this.toggleLoading();
        const user = {
            username: this.state.username,
            password: this.state.password,
            name: this.state.name,
            gender: this.state.gender,
            email: this.state.email,
            phone: this.state.phone,
            address: this.state.address,
            position: this.state.position,
            age: this.state.age,
            roles: this.state.roles,
        }
        const response = await axios.post("http://localhost:4000/users/create", user);
        console.log("res: ", response.data)
        if (response.status === 201) {
            this.reset();
            alert("Post created!")
        }
        else {
            alert("Failed to create")
        }
        this.toggleLoading();
    };

    render() {
        return (
            <div className="mx-auto pt-5" style={{width:"400px"}}>
                <h3 className="pb-20 pt-30">Create User</h3>
                <Form onSubmit={this.createUser} onReset={this.reset}>
                    <Row form>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="exampleUsername">Username</Label>
                                <Input type="text"
                                    name="username"
                                    value={this.state.username}
                                    onChange={this.onUsernameOnChange}
                                    placeholder="Enter username..." />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="examplePassword">Password</Label>
                                <Input onChange={this.onPasswordlOnChange}
                                    type="text"
                                    name="password"
                                    placeholder="Enter Password..." />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row form>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="exampleCity">Name</Label>
                                <Input type="text"
                                    name="name"
                                    value={this.state.name}
                                    onChange={this.onNameOnChange}
                                    placeholder="Enter name..." />
                            </FormGroup>
                        </Col>
                        <Col md={2}>
                            <FormGroup>
                                <Label for="exampleState">Age</Label>
                                <Input type="number" name="age"
                                    value={this.state.age}
                                    onChange={this.onAgeOnChange} />
                            </FormGroup>
                        </Col>
                        <Col md={2}>
                            <FormGroup>
                                <Label for="exampleSelect">Gender</Label>
                                <Input type="select"
                                    name="select"
                                    id="exampleSelect"
                                    value={this.state.gender}
                                    onChange={this.onGenderOnChange}>
                                    <option value="">--Please choose an option--</option>
                                    <option>Male</option>
                                    <option>Falmale</option>
                                </Input>
                            </FormGroup>
                        </Col>
                        <Col md={2}>
                            <FormGroup>
                                <Label for="exampleSelect">Roles</Label>
                                <Input type="select"
                                    name="select"
                                    id=""
                                    value={this.state.roles}
                                    onChange={this.onRolesOnChange}>
                                    <option value="">--Please choose an option--</option>
                                    <option>admin</option>
                                    <option>user</option>
                                </Input>
                            </FormGroup>
                        </Col>
                    </Row>
                    <FormGroup>
                        <Label for="exampleAddress">Address</Label>
                        <Input type="text"
                            name="address"
                            placeholder="1234 Main St..."
                            value={this.state.address}
                            onChange={this.onAddressOnChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleEmail">Email</Label>
                        <Input type="email"
                            name="email"
                            placeholder="abc@hapo.com"
                            value={this.state.email}
                            onChange={this.onEmailOnChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="examplePhone">Phone</Label>
                        <Input type="text"
                            name="phone"
                            placeholder="phone number...."
                            value={this.state.phone}
                            onChange={this.onPhoneOnChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="examplePosition">Position</Label>
                        <Input type="text"
                            name="position"
                            placeholder="poition...."
                            value={this.state.position}
                            onChange={this.onPositionOnChange} />
                    </FormGroup>
                    <FormGroup check>
                        <Input type="checkbox"
                            name="check"
                            id="exampleCheck"
                            value={this.state.agreeRoles}
                            onChange={this.onAgreeRolesOnChange} />
                        <Label for="exampleCheck" check>I agree with the rule</Label>
                    </FormGroup>
                    <Button disabled={this.state.loading} outline color="success" className="float-right" type="reset">RESET</Button>
                    <Button disabled={this.state.loading} outline color="primary" className="float-right" type="submit">CREATE</Button>
                </Form>
                <Button color="secondary" className="text-white" href="/">BACK</Button>
            </div>
        )
    }
}
