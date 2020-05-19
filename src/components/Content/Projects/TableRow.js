import React, { Component } from 'react';
import axios from 'axios';
import { Button } from 'reactstrap';
import EditProjects from './edit';
import ShowProject from './show';

class TableRow extends Component {
    state = {
        modalEditVisible: false,
        modalShowVisible: false,
        project: []
    }
    constructor(props) {
        super(props);
        this.delete = this.delete.bind(this);

    }
    async delete() {
        const token = localStorage.getItem("jwt_token");
        const AuthStr = 'Bearer ' + token;
        const response = await axios.delete('http://localhost:4000/projects/' + this.props.obj.id, { headers: { 'Authorization': AuthStr } })
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
        if(this.props.obj.project){
            if (!this.props.admin) {
                const token = localStorage.getItem("jwt_token");
                const AuthStr = 'Bearer ' + token;
                axios.get('http://localhost:4000/projects/' + this.props.obj.project.id, { headers: { 'Authorization': AuthStr } })
                    .then(response => {
                        this.setState({ project: response.data });
                    })
                    .catch(function (error) {
                        console.log(error);
                    })
            }
        }

    }

    render() {
        console.log(this.props.obj)
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
                    <EditProjects
                        visible={this.state.modalEditVisible}
                        onToggle={this.toggleModalEditVisibleVisible}
                        key={this.props.obj.id}
                        project={this.props.obj} />
                    <ShowProject
                        visible={this.state.modalShowVisible}
                        onToggle={this.toggleModalShowVisibleVisible}
                        key={this.props.obj.id}
                        author={this.props.obj.author}
                        member={this.props.obj.members}
                        task={this.props.obj.tasks}
                        customer={this.props.obj.customers}
                        project={this.props.obj}
                    />
                </> : <>
                        <tr>
                            <th scope="row">{this.state.project.id}</th>
                            <td onClick={this.toggleModalShowVisibleVisible}>{this.state.project.name}</td>
                            <td>{this.state.project.description}</td>
                            <td>{this.state.project.status}</td>
                            <td>
                                <Button onClick={this.toggleModalEditVisibleVisible} className="btn btn-primary" style={{ marginRight: 10 }}>Edit</Button>
                                <Button onClick={this.delete} className="btn btn-danger">Delete</Button>
                            </td>
                        </tr>
                        <EditProjects
                            visible={this.state.modalEditVisible}
                            onToggle={this.toggleModalEditVisibleVisible}
                            key={this.state.project.id}
                            project={this.state.project} />
                        <ShowProject
                            visible={this.state.modalShowVisible}
                            onToggle={this.toggleModalShowVisibleVisible}
                            key={this.state.project.id}
                            author={this.state.project.author}
                            member={this.state.project.members}
                            task={this.state.project.tasks}
                            customer={this.state.project.customers}
                            project={this.state.project}
                        /></>}
            </>
        );
    }
}

export default TableRow;
