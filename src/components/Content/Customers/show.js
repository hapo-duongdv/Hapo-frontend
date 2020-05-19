import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios';

class ShowCustomer extends React.Component {
    state = {
        project: []
    }

    async getProject() {
        const token = localStorage.getItem("jwt_token");
        const AuthStr = 'Bearer ' + token;
        await axios.get('http://localhost:4000/customers/'+this.props.customer.id,  { headers: { 'Authorization': AuthStr } })
            .then(response => {
                this.setState({ project: response.data.projects });
            })
            .catch(function (error) {
                console.log(error);
            })

    }
    render() {
        return (
            <div>
                <Modal
                    isOpen={this.props.visible}
                    className={this.props.className}>
                    <ModalHeader>Customers</ModalHeader>
                    <ModalBody>
                        <ul key={this.props.customer.id}>
                            <li>ID : {this.props.customer.id}</li>
                            <li>Name : {this.props.customer.name}</li>
                            <li>Gender : {this.props.customer.gender}</li>
                            <li>Email : {this.props.customer.email}</li>
                            <li>Address : {this.props.customer.address}</li>
                            <li>Phone : {this.props.customer.phone}</li>
                            <li>Project: </li>
                            {this.props.project ? <>
                                <ul>
                                    <li>ID : {this.props.project.id}</li>
                                    <li>Name : {this.props.project.name}</li>
                                    <li>Description : {this.props.project.description}</li>
                                    <li>status : {this.props.project.status}</li>
                                </ul>
                            </> :
                            <></>
                            }
                        </ul>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.props.onToggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default ShowCustomer;
