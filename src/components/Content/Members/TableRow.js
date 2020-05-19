import React, { Component } from 'react';
import axios from 'axios';
import Edit from './edit';
import Show from './show'
import { Button } from 'reactstrap';

class TableRow extends Component {
    state = {
        modalEditVisible: false,
        modalShowVisible: false
    }
    constructor(props) {
        super(props);
        this.delete = this.delete.bind(this);

    }
    async delete() {
        const token = localStorage.getItem("jwt_token");
        const AuthStr = 'Bearer ' + token;
        const response = await axios.delete('http://localhost:4000/users/' + this.props.obj.id,
            { headers: { 'Authorization': AuthStr } }
        )
        if (response.status === 200) {
            alert("deleted!")
        }
        else alert("Error!")
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
        // console.log(this.props.obj.projects)
        return (
            <>
                <tr>
                    <th scope="row">{this.props.obj.id}</th>
                    <td onClick={this.toggleModalShowVisibleVisible}>{this.props.obj.name}</td>
                    <td>{this.props.obj.gender}</td>
                    <td>{this.props.obj.email}</td>
                    <td>{this.props.obj.phone}</td>
                    <td>{this.props.obj.address}</td>
                    <td>{this.props.obj.position}</td>
                    {this.props.admin ? <>
                        <td>
                            <Button onClick={this.toggleModalEditVisibleVisible} className="btn btn-primary" style={{ marginRight: 10 }}>Edit</Button>
                            <Button onClick={this.delete} className="btn btn-danger">Delete</Button>
                        </td>
                    </> : <>
                            <td></td>
                        </>}

                </tr>
                <Edit
                    visible={this.state.modalEditVisible}
                    onToggle={this.toggleModalEditVisibleVisible}
                    key={this.props.obj.id}
                    user={this.props.obj} />
                <Show
                    visible={this.state.modalShowVisible}
                    onToggle={this.toggleModalShowVisibleVisible}
                    key={this.props.obj.id}
                    task={this.props.obj.tasks}
                    project={this.props.obj.projects}
                    user={this.props.obj} />
            </>
        );
    }
}

export default TableRow;
