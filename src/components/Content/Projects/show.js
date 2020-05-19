import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ShowProject extends React.Component {

    render() {
        console.log(this.props.author)
        return (
            <div>
                <Modal
                    isOpen={this.props.visible}
                    className={this.props.className}>
                    <ModalHeader>Project</ModalHeader>
                    <ModalBody>
                        <ul key={this.props.project.id}>
                            <li>ID : {this.props.project.id}</li>
                            <li>Name : {this.props.project.name}</li>
                            <li>Description : {this.props.project.description}</li>
                            <li>Status : {this.props.project.status}</li>
                            <li>Customer: </li>
                            {this.props.customer ? <>
                                {this.props.customer.map((customer) => {
                                    return <ul>
                                        <li>ID : {customer.id}</li>
                                        <li>Name : {customer.name}</li>
                                        <li>Gender : {customer.gender}</li>
                                        <li>Email : {customer.email}</li>
                                        <li>Address : {customer.address}</li>
                                        <li>Phone : {customer.phone}</li>
                                    </ul>
                                })}
                            </> :
                                <></>
                            }
                            <li>List tasks: </li>
                            {this.props.task ? <>
                                {this.props.task.map((task) => {
                                    return <ul key={task.id}>
                                        <li>ID: {task.id}</li>
                                        <li>Name: {task.name}</li>
                                        <li>Description: {task.description}</li>
                                        <li>Status: {task.status}</li>
                                        <br></br>
                                    </ul>

                                })}
                            </> : <></>}
                            <li>List members: </li>
                            {this.props.member ? <>
                                {this.props.member.map((member) => {
                                    return <ul key={member.id}>
                                        <li>Name : {member.name}</li>
                                        <li>Gender : {member.gender}</li>
                                        <li>Email : {member.email}</li>
                                        <li>Address : {member.address}</li>
                                        <li>Phone : {member.phone}</li>
                                        <li>Position : {member.position}</li>
                                        <br></br>
                                    </ul>

                                })}
                            </> : <></>}
                            <li>Author: </li>
                            {this.props.author ? <>
                                <ul>
                                    <li>ID : {this.props.author.id}</li>
                                    <li>Name : {this.props.author.name}</li>
                                    <li>Gender : {this.props.author.gender}</li>
                                    <li>Email : {this.props.author.email}</li>
                                    <li>Address : {this.props.author.address}</li>
                                    <li>Phone : {this.props.author.phone}</li>
                                    <li>Position : {this.props.author.position}</li>
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

export default ShowProject;
