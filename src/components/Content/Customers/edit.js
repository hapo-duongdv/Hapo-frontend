import React, { Component } from 'react';
import axios from 'axios';
import { Form, Row, Col, FormGroup, Label, Input, Button, Modal } from 'reactstrap'


export default class EditCustomers extends Component {
    constructor(props) {
        super(props);
        this.onNameOnChange = this.onNameOnChange.bind(this);
        this.onAgeOnChange = this.onAgeOnChange.bind(this);
        this.onPhoneOnChange = this.onPhoneOnChange.bind(this);
        this.onGenderOnChange = this.onGenderOnChange.bind(this);
        this.onAddressOnChange = this.onAddressOnChange.bind(this);
        this.onEmailOnChange = this.onEmailOnChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: "",
            gender: "",
            email: "",
            phone: "",
            address: "",
            age: "",
        }
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

    toggleLoading = () => {
        this.setState({
            loading: !this.state.loading
        })
    }

    async onSubmit(e) {
        e.preventDefault();
        this.toggleLoading();
        const obj = {
            name: this.state.name,
            gender: this.state.gender,
            email: this.state.email,
            phone: this.state.phone,
            address: this.state.address,
            age: this.state.age,
        };
        const token = localStorage.getItem("jwt_token");
        const AuthStr = 'Bearer ' + token;
        const response = await axios.put('http://localhost:4000/customers/' + this.props.customer.id, obj,
        { headers: { 'Authorization': AuthStr } }
        )
        console.log(response.status)
        if (response.status === 200) {
            this.reset();
            alert(" updated!")
        }
        else {
            alert("Failed to update")
        }
        this.toggleLoading();
    }

    reset = ()=> {
        this.setState({
            name: "",
            gender: "",
            email: "",
            phone: "",
            address: "",
            age: ""
        })
    }

    componentDidMount() {
        this.setState({
            name: this.props.customer.name,
            gender: this.props.customer.gender,
            email: this.props.customer.email,
            phone: this.props.customer.phone,
            address: this.props.customer.address,
            position: this.props.customer.position,
            age: this.props.customer.age,
        })
    }

    render() {
        return (
            <Modal
                isOpen={this.props.visible}
                className={this.props.className}>
                <div style={{ padding: 10 }}>
                    <h3 className="pb-20 pt-30">Edit Customer</h3>
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
                                        <option>Male</option>
                                        <option>Falmale</option>
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
                        <Button disabled={this.state.loading} outline color="secondary" className="float-right" onClick={this.props.onToggle}>CANCEL</Button>
                        <Button disabled={this.state.loading} outline color="warning" className="float-right" type="reset">RESET</Button>
                        <Button disabled={this.state.loading} outline color="primary" className="float-right" type="submit">EDIT</Button>
                    </Form>
                </div>
            </Modal>

        )
    }
}
