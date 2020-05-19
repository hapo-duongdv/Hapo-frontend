import React, { Component } from 'react'
import { Table, Button } from 'reactstrap';
import '../../../css/member.css'
import axios from 'axios';
import TableRow from './TableRow';

export default class Customers extends Component {
    constructor(props) {
        super(props);
        this.state = { customers: [] };
    }

    componentDidMount() {
        const token = localStorage.getItem("jwt_token");
        const AuthStr = 'Bearer ' + token;
        axios.get('http://localhost:4000/customers', { headers: { 'Authorization': AuthStr } })
            .then(response => {
                this.setState({ customers: response.data });
            })
            .catch(function (error) {
                console.log(error);
            })

    }

    tabRow() {
        const admin = this.props.admin;
        return this.state.customers.map(function (object, i) {
            return <TableRow obj={object} key={i} admin={admin} />;
        });
    }

    render() {

        return (
            <div className="body">
                <h3 className="pb-20">Management Customers</h3>
                {this.props.admin ? <>
                    <Button color="primary" className="text-white" href="/create-customer">CREATE</Button>
                </> : <></>}

                <Table responsive striped>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Gender</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Address</th>
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
