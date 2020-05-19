import React, { Component } from 'react';
import { Modal, Label, Input, Form, FormGroup, Button } from 'reactstrap';
import axios from 'axios';

export default class EditProjects extends Component {
    constructor(props) {
        super(props);
        this.onNameOnChange = this.onNameOnChange.bind(this);
        this.onDescriptionOnChange = this.onDescriptionOnChange.bind(this);
        this.onStatusOnChange = this.onStatusOnChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: "",
            description: "",
            status: ""
        }
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
            description: this.state.description,
            status: this.state.status,
        };
        const token = localStorage.getItem("jwt_token");
        const AuthStr = 'Bearer ' + token;
        const response = await axios.put('http://localhost:4000/projects/' + this.props.project.id, obj,
        { headers: { 'Authorization': AuthStr }})
        console.log(response.status)
        if (response.status === 200) {
            alert("updated!")
        }
        else {
            alert("Failed to update")
        }
        this.toggleLoading();
    }

    reset = () => {
        this.setState({
            name: "",
            description: "",
            status: "",
        })
    }

    componentDidMount() {
        this.setState({
            name: this.props.project.name,
            description: this.props.project.description,
            status: this.props.project.status,
        })
    }

    render() {

        return (
            <Modal
                isOpen={this.props.visible}
                className={this.props.className}>
                <div style={{ padding: 10 }}>
                    <h3 className="pb-20 pt-30">Edit Projects</h3>
                    <Form onSubmit={this.onSubmit} onReset={this.reset}>
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
                        <Button disabled={this.state.loading} outline color="secondary" className="float-right" onClick={this.props.onToggle}>CANCEL</Button>
                        <Button disabled={this.state.loading} outline color="warning" className="float-right" type="reset">RESET</Button>
                        <Button disabled={this.state.loading} outline color="primary" className="float-right" type="submit">EDIT</Button>
                    </Form>
                </div>
            </Modal>

        )
    }
}
