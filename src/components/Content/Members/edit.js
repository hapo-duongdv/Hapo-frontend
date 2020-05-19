import React, { Component } from 'react';
import axios from 'axios';
import { Form, Row, Col, FormGroup, Label, Input, Button, Modal } from 'reactstrap'

export default class Edit extends Component {
    constructor(props) {
        super(props);
        this.onUsernameOnChange = this.onUsernameOnChange.bind(this);
        this.onNameOnChange = this.onNameOnChange.bind(this);
        this.onAgeOnChange = this.onAgeOnChange.bind(this);
        this.onPasswordlOnChange = this.onPasswordlOnChange.bind(this);
        this.onRolesOnChange = this.onRolesOnChange.bind(this);
        this.onPhoneOnChange = this.onPhoneOnChange.bind(this);
        this.onGenderOnChange = this.onGenderOnChange.bind(this);
        this.onAddressOnChange = this.onAddressOnChange.bind(this);
        this.onEmailOnChange = this.onEmailOnChange.bind(this);
        this.onPositionOnChange = this.onPositionOnChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
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
        }
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

    toggleLoading = () => {
        this.setState({
            loading: !this.state.loading
        })
    }

    async onSubmit(e) {
        e.preventDefault();
        this.toggleLoading();
        const obj = {
            username: this.state.username,
            password: this.state.password,
            name: this.state.name,
            gender: this.state.gender,
            email: this.state.email,
            phone: this.state.phone,
            address: this.state.address,
            position: this.state.position,
            age: this.state.age,
            roles: this.state.roles
        };
        const token = localStorage.getItem("jwt_token");
        const AuthStr = 'Bearer ' + token;
        console.log("Bearer:",AuthStr)
        const response = await axios.put('http://localhost:4000/users/' + this.props.user.id, obj,
        { headers: { 'Authorization': AuthStr } }
        )
        if (response.status === 200) {
            this.reset();
            alert("User updated!")
        }
        else {
            alert("Failed to update")
        }
        this.toggleLoading();
    }

    reset = ()=> {
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
            roles: ""
        })
    }

    componentDidMount() {
        this.setState({
            name: this.props.user.name,
            gender: this.props.user.gender,
            email: this.props.user.email,
            phone: this.props.user.phone,
            address: this.props.user.address,
            position: this.props.user.position,
            age: this.props.user.age,
            roles: this.props.user.roles
        })
    }

    render() {
        return (
            <Modal
                isOpen={this.props.visible}
                className={this.props.className}>
                <div style={{ padding: 10 }}>
                    <h3 className="pb-20 pt-30">Edit User</h3>
                    <Form onSubmit={this.onSubmit} onReset={this.reset} >
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
                        <Button disabled={this.state.loading} outline color="secondary" className="float-right" onClick={this.props.onToggle}>CANCEL</Button>
                        <Button disabled={this.state.loading} outline color="warning" className="float-right" type="reset">RESET</Button>
                        <Button disabled={this.state.loading} outline color="primary" className="float-right" type="submit">EDIT</Button>
                    </Form>
                </div>
            </Modal>

        )
    }
}
