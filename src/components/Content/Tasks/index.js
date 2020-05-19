import React, { Component } from 'react'
import { Table, Button } from 'reactstrap';
import TableRow from './TableRow';
import axios from 'axios';
import '../../../css/member.css'

export default class Tasks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            tasksUser: []
        };
    }

    componentDidMount() {
        const token = localStorage.getItem("jwt_token");
        const AuthStr = 'Bearer ' + token;
        axios.get('http://localhost:4000/tasks', { headers: { 'Authorization': AuthStr } })
            .then(response => {
                this.setState({ tasks: response.data });
            })
            .catch(function (error) {
                console.log(error);
            })
        if (!this.props.admin) {
            axios.get('http://localhost:4000/users/' + this.props.user.id, { headers: { 'Authorization': AuthStr } })
                .then(response => {
                    console.log(response.data)
                    this.setState({ tasksUser: response.data[0].tasks });
                })
                .catch(function (error) {
                    console.log(error);
                })
        }

    }

    tabRow() {
        const admin = this.props.admin;
        if (admin) {
            return this.state.tasks.map(function (object, i) {
                return <TableRow obj={object} key={i} admin={admin} />;
            });
        }
        else {
            return this.state.tasksUser.map(function (task, i) {
                return <TableRow obj={task} key={i} />;
            });
        }

    }

    render() {
        return (
            <div className="table body">
                <h3 className="pb-20">Management Tasks</h3>
                <Button color="primary" className="text-white" href="/create-task">CREATE</Button>
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
                    <tbody>
                        {this.tabRow()}
                    </tbody>
                </Table>
            </div>
        )
    }
}
