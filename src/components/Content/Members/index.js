import React, { Component } from 'react';
import axios from 'axios';
import TableRow from './TableRow';
import { Button, Table } from 'reactstrap';
import '../../../css/member.css'

export default class Members extends Component {
    constructor(props) {
        super(props);
        this.state = { persons: [] };
    }

    componentDidMount() {
        const token = localStorage.getItem("jwt_token");
        const AuthStr = 'Bearer ' + token;
        axios.get('http://localhost:4000/users', { headers: { 'Authorization': AuthStr } })
            .then(response => {
                console.log(response.data);
                this.setState({ persons: response.data });
            })
            .catch(function (error) {
                console.log(error);
            })

    }

    tabRow() {
        const admin = this.props.admin;
        return this.state.persons.map(function (object, i) {
            return <TableRow obj={object} key={i} admin={admin} />;
        });
    }

    render() {
        return (
            <div className="body">
                <h3 className="pb-20">Management members</h3>
                {this.props.admin ? <>
                    <Button color="primary" className="text-white" href="/create-member">CREATE</Button>
                </> : <></>
                }
                <Table responsive striped>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Gender</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Address</th>
                            <th>Position</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.tabRow()}
                    </tbody>
                </Table>
            </div>
        );
    }
}
