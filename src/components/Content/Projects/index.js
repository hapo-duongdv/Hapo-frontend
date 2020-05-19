import React, { Component } from 'react'
import { Table, Button, FormGroup, Input, Label, Form, Row, Col } from 'reactstrap';
import '../../../css/member.css'
import TableRow from './TableRow';
import axios from 'axios';

export default class Projects extends Component {
    constructor(props) {
        super(props);
        this.onSubmitMembers = this.onSubmitMembers.bind(this);
        this.onSubmitCustomer = this.onSubmitCustomer.bind(this);
        this.state = {
            projects: [],
            users: [],
            customers: [],
            user: "",
            project: "",
            customer: "",
            projectUser: "",
            taskUser: []
        };
    }


    onUserOnChange = (event) => {
        this.setState({
            user: event.target.value
        })
    }

    onProjectOnChange = (event) => {
        this.setState({
            project: event.target.value
        })
    }

    onCustomerOnChange = (event) => {
        this.setState({
            customer: event.target.value
        })
    }


    componentDidMount() {
        const token = localStorage.getItem("jwt_token");
        const AuthStr = 'Bearer ' + token;
        axios.get('http://localhost:4000/projects', { headers: { 'Authorization': AuthStr } })
            .then(response => {
                this.setState({ projects: response.data });
            })
            .catch(function (error) {
                console.log(error);
            })
        axios.get('http://localhost:4000/users', { headers: { 'Authorization': AuthStr } })
            .then(response => {
                this.setState({ users: response.data });
            })
            .catch(function (error) {
                console.log(error);
            })
        axios.get('http://localhost:4000/customers', { headers: { 'Authorization': AuthStr } })
            .then(response => {
                this.setState({ customers: response.data });
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    async onSubmitMembers(e) {
        e.preventDefault();
        const token = localStorage.getItem("jwt_token");
        const AuthStr = 'Bearer ' + token;
        const userId = this.state.user;
        const member = await axios.get("http://localhost:4000/users/" + userId, { headers: { 'Authorization': AuthStr } })
        // console.log(member.data[0])
        if (member.data.projects) {
            //throw err 
            alert("Error : user had a project")
        }
        else {
            const projectId = this.state.project;
            const addMember = await axios.post("http://localhost:4000/users/add/" + projectId, member.data, { headers: { 'Authorization': AuthStr } })
            if (addMember.status === 201) {
                alert("Success!")
            }
            else {
                alert("Error!")
            }
        }
    }

    async onSubmitCustomer(e) {
        e.preventDefault();
        const token = localStorage.getItem("jwt_token");
        const AuthStr = 'Bearer ' + token;
        const customerId = this.state.customer.split(' ')[0];
        const customer = await axios.get("http://localhost:4000/customers/" + customerId, { headers: { 'Authorization': AuthStr } })
        console.log(customer)
        if (customer.data.projects) {
            //throw err 
            alert("Error : customer had a project")
        }
        else {
            const project = this.state.project.split(' ')[0];
            const addCustomer = await axios.post("http://localhost:4000/customers/add/" + project, customer.data, { headers: { 'Authorization': AuthStr } })

            if (addCustomer.status === 201) {
                alert("Success!")
            }
            else {
                alert("Error!")
            }
        }
    }

    tabRow() {
        const admin = this.props.admin;
        if (admin) {
            return this.state.projects.map(function (object, i) {
                return <TableRow obj={object} key={i} admin={admin} />;
            });

        }
        else return <TableRow obj={this.props.user} admin={admin} />;
    }

    render() {
        return (
            <div className="table body">
                <h3 className="pb-20">Management Projects</h3>
                <Button color="primary" className="text-white" href="/create-project">CREATE</Button>
                <Row>
                    <Col md={4}>
                        <Form onSubmit={this.onSubmitMembers}>
                            <FormGroup>
                                <Label for="exampleSelect">Add members for project</Label>
                                <Input type="select"
                                    name="select"
                                    id="exampleSelect"
                                    value={this.state.project}
                                    onChange={this.onProjectOnChange}>
                                    <option value="">--Please choose a project--</option>
                                    {this.state.projects.map((listValue) => {
                                        return (
                                            <option>{listValue.id} : {listValue.name}</option>
                                        )
                                    })}

                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Input type="select"
                                    name="select"
                                    id="exampleSelect"
                                    value={this.state.user}
                                    onChange={this.onUserOnChange}>
                                    <option value="">--Please choose members--</option>
                                    {this.state.users.map((listValue) => {
                                        return (
                                            <option>{listValue.id} : {listValue.name}</option>
                                        )
                                    })}

                                </Input>
                            </FormGroup>
                            <Button type="submit" color="secondary" className="text-white" >Add member</Button>
                        </Form>
                    </Col>
                    <Col md={4}>
                        <Form onSubmit={this.onSubmitCustomer}>
                            <FormGroup>
                                <Label for="exampleSelect">Add customers for project</Label>
                                <Input type="select"
                                    name="select"
                                    id="exampleSelect"
                                    value={this.state.project}
                                    onChange={this.onProjectOnChange}>
                                    <option value="">--Please choose a project--</option>
                                    {this.state.projects.map((listValue) => {
                                        return (
                                            <option>{listValue.id}</option>
                                        )
                                    })}

                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Input type="select"
                                    name="select"
                                    id="exampleSelect"
                                    value={this.state.customer}
                                    onChange={this.onCustomerOnChange}>
                                    <option value="">--Please choose a customer--</option>
                                    {this.state.customers.map((listValue) => {
                                        return (
                                            <option>{listValue.id}</option>
                                        )
                                    })}

                                </Input>
                            </FormGroup>
                            <Button type="submit" color="secondary" className="text-white" >Add customer</Button>
                        </Form>
                    </Col>
                </Row>
                <Table responsive striped>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody className="pt-5">
                        {this.tabRow()}
                    </tbody>
                </Table>
            </div>
        )
    }
}

