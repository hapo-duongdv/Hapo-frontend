import React, { Component } from 'react';
import axios from 'axios';
import EditTasks from './edit';
import ShowTask from './show'
import { Button } from 'reactstrap';

class TableRow extends Component {
    state = {
        modalEditVisible: false,
        modalShowVisible: false,
        tasks: []
    }
    constructor(props) {
        super(props);
        this.delete = this.delete.bind(this);

    }
    async delete() {
        const token = localStorage.getItem("jwt_token");
        const AuthStr = 'Bearer ' + token;
        const response = await axios.delete('http://localhost:4000/tasks/' + this.props.obj.id, { headers: { 'Authorization': AuthStr } })
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

    componentDidMount() {
        if (!this.props.admin) {
            const token = localStorage.getItem("jwt_token");
            const AuthStr = 'Bearer ' + token;
            axios.get('http://localhost:4000/tasks/' + this.props.obj.id, { headers: { 'Authorization': AuthStr } })
                .then(response => {
                    this.setState({ tasks: response.data });
                })
                .catch(function (error) {
                    console.log(error);
                })
        }
    }

    render() {
        return (
            <>
                {this.props.admin ? <>
                    <tr>
                        <th scope="row">{this.props.obj.id}</th>
                        <td onClick={this.toggleModalShowVisibleVisible}>{this.props.obj.name}</td>
                        <td>{this.props.obj.description}</td>
                        <td>{this.props.obj.status}</td>
                        <td>
                            <Button onClick={this.toggleModalEditVisibleVisible} className="btn btn-primary" style={{ marginRight: 10 }}>Edit</Button>
                            <Button onClick={this.delete} className="btn btn-danger">Delete</Button>
                        </td>
                    </tr>
                    <EditTasks
                        visible={this.state.modalEditVisible}
                        onToggle={this.toggleModalEditVisibleVisible}
                        key={this.props.obj.id}
                        task={this.props.obj} />
                    <ShowTask
                        visible={this.state.modalShowVisible}
                        onToggle={this.toggleModalShowVisibleVisible}
                        key={this.props.obj.id}
                        author={this.props.obj.author}
                        project={this.props.obj.projects}
                        task={this.props.obj} />
                </> : <>
                        {/* {this.state.tasks} */}
                        <tr>
                            <th scope="row">{this.state.tasks.id}</th>
                            <td onClick={this.toggleModalShowVisibleVisible}>{this.state.tasks.name}</td>
                            <td>{this.state.tasks.description}</td>
                            <td>{this.state.tasks.status}</td>
                            <td>
                                <Button onClick={this.toggleModalEditVisibleVisible} className="btn btn-primary" style={{ marginRight: 10 }}>Edit</Button>
                                <Button onClick={this.delete} className="btn btn-danger">Delete</Button>
                            </td>
                        </tr>
                        <EditTasks
                            visible={this.state.modalEditVisible}
                            onToggle={this.toggleModalEditVisibleVisible}
                            key={this.state.tasks.id}
                            task={this.state.tasks} />
                        <ShowTask
                            visible={this.state.modalShowVisible}
                            onToggle={this.toggleModalShowVisibleVisible}
                            key={this.state.tasks.id}
                            author={this.state.tasks.author}
                            project={this.state.tasks.projects}
                            task={this.state.tasks} />
                    </>}

            </>
        );
    }
}

export default TableRow;
