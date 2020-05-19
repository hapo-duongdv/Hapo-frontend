import React, { Component } from 'react';
import { Label, Input, Form, FormGroup, Button } from 'reactstrap';
import axios from 'axios';


export default class CreateProject extends Component {
    state = {
        name: "",
        description: "",
        status: "",
        agreeRoles: false
    }

    onNameOnChange = (event) => {
        this.setState({
            name: event.target.value
        })
    }

    onDescriptionOnChange = (event) => {
        this.setState({
            description: event.target.value
        })
    }

    onStatusOnChange = (event) => {
        this.setState({
            status: event.target.value
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
            description: "",
            status: "",
        })
    }

    createProject = async event => {
        event.preventDefault();
        this.toggleLoading();
        const project = {
            name: this.state.name,
            description: this.state.description,
            status: this.state.status,
        }
        const token = localStorage.getItem("jwt_token");
        const AuthStr = 'Bearer ' + token;
        const response = await axios.post("http://localhost:4000/projects/create", project,
        { headers: { 'Authorization': AuthStr } }
        );
        if (response.status === 201) {
            this.reset();
            alert("created!")
        }
        else {
            alert("Failed to create")
        }
        this.toggleLoading();
    };


    render() {
        return (
            <div className="mx-auto pt-5" style={{width:"400px"}}>
                <h3 className="pb-20 pt-30">Create Project</h3>
                <Form onSubmit={this.createProject} onReset={this.reset}>
                    <FormGroup>
                        <Label for="exampleName">Name</Label>
                        <Input type="text"
                            name="name"
                            placeholder="task name..."
                            value={this.state.name}
                            onChange={this.onNameOnChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleDescription">Description</Label>
                        <Input type="text" name="description" placeholder="description..." value={this.state.description}
                            onChange={this.onDescriptionOnChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleStatus">Status</Label>
                        <Input type="text" name="status" placeholder="status...." value={this.state.status}
                            onChange={this.onStatusOnChange} />
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
