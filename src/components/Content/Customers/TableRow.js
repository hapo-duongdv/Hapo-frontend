import React, { Component } from 'react';
import axios from 'axios';
import { Button } from 'reactstrap';
import EditCustomers from './edit';
import ShowCustomer from './show';

class TableRow extends Component {
    state = {
        modalEditVisible: false,
        modalShowVisible: false,
        showAlert: false,
        titleAlert: ''
    }
    constructor(props) {
        super(props);
        this.delete = this.delete.bind(this);

    }
    async delete() {
        const token = localStorage.getItem("jwt_token");
        const AuthStr = 'Bearer ' + token;
        const response = await axios.delete('http://localhost:4000/customers/' + this.props.obj.id,
            { headers: { 'Authorization': AuthStr } }
        )
        if (response.status === 200) {
            alert("deleted!")
        }
        else alert("error")
    }

    toggleModalEditVisibleVisible = () => {
        this.setState({
            modalEditVisible: !this.state.modalEditVisible
        });
    };

    toggleModalShowVisibleVisible = () => {
        this.setState({
            modalShowVisible: !this.state.modalShowVisible
        });
    };

    render() {
        return (
            <>
                <tr>
                    <th scope="row">{this.props.obj.id}</th>
                    <td onClick={this.toggleModalShowVisibleVisible}>{this.props.obj.name}</td>
                    <td>{this.props.obj.gender}</td>
                    <td>{this.props.obj.email}</td>
                    <td>{this.props.obj.phone}</td>
                    <td>{this.props.obj.address}</td>
                    {this.props.admin ? <>
                        <td>
                            <Button onClick={this.toggleModalEditVisibleVisible} className="btn btn-primary" style={{ marginRight: 10 }}>Edit</Button>
                            <Button onClick={this.delete} className="btn btn-danger">Delete</Button>
                        </td>
                    </> : <>
                            <td></td>
                        </>}

                </tr>
                <EditCustomers
                    visible={this.state.modalEditVisible}
                    onToggle={this.toggleModalEditVisibleVisible}
                    key={this.props.obj.id}
                    customer={this.props.obj} />
                <ShowCustomer
                    visible={this.state.modalShowVisible}
                    onToggle={this.toggleModalShowVisibleVisible}
                    key={this.props.obj.id}
                    project={this.props.obj.projects}
                    customer={this.props.obj} />

            </>

        );
    }
}

export default TableRow;
