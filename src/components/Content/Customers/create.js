import React, { Component } from 'react';
import { Label, Input, Form, Row, Col, FormGroup, Button } from 'reactstrap';
import axios from 'axios';

export default class CreateCustomer extends Component {
    state = {
        name: "",
        gender: "",
        email: "",
        phone: "",
        address: "",
        age: "",
        loading: false,
        agreeRoles: false,
        projects: []
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
            name: "",
            gender: "",
            email: "",
            phone: "",
            address: "",
            age: "",
            agreeRoles: false,
        })
    }

    createCustomer = async event => {
        event.preventDefault();
        this.toggleLoading();
        const customer = {
            name: this.state.name,
            gender: this.state.gender,
            email: this.state.email,
            phone: this.state.phone,
            address: this.state.address,
            age: this.state.age,
        }
        const response = await axios.post("http://localhost:4000/customers/create", customer);
        if (response.status === 201) {
            this.reset();
            alert("created!")
        }
        else {
            alert("Failed to create")
        }
        this.toggleLoading();
    };

    componentDidMount() {
        const token = localStorage.getItem("jwt_token");
        const AuthStr = 'Bearer ' + token;
        axios.get('http://localhost:4000/projects', { headers: { 'Authorization': AuthStr } })
            .then(response => {
                console.log(response.data);
                this.setState({ projects: response.data });
            })
            .catch(function (error) {
                console.log(error);
            })
    }


    render() {
        return (
            <div className="mx-auto pt-5" style={{width:"400px"}}>
                <h3 className="pb-20 ">Create Customer</h3>
                <Form onSubmit={this.createCustomer} onReset={this.reset}>
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
                        <Col md={3}>
                            <FormGroup>
                                <Label for="exampleState">Age</Label>
                                <Input type="number" name="age"
                                    value={this.state.age}
                                    onChange={this.onAgeOnChange} />
                            </FormGroup>
                        </Col>
                        <Col md={3}>
                            <FormGroup>
                                <Label for="exampleSelect">Gender</Label>
                                <Input type="select"
                                    name="select"
                                    id="exampleSelect"
                                    value={this.state.gender}
                                    onChange={this.onGenderOnChange}>
                                    <option value="">--Please choose an option--</option>
                                    <option>male</option>
                                    <option>falmale</option>
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
