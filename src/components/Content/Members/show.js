import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class Show extends React.Component {

    render() {
        console.log(this.props)
        return (
            <div>
                <Modal
                    isOpen={this.props.visible}
                    className={this.props.className}>
                    <ModalHeader>Members</ModalHeader>
                    <ModalBody>
                        <ul key={this.props.user.id}>
                            <li>ID : {this.props.user.id}</li>
                            <li>Name : {this.props.user.name}</li>
                            <li>Gender : {this.props.user.gender}</li>
                            <li>Email : {this.props.user.email}</li>
                            <li>Address : {this.props.user.address}</li>
                            <li>Phone : {this.props.user.phone}</li>
                            <li>Position : {this.props.user.position}</li>
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
                            <li>Project: </li>
                            {this.props.project ? <>
                                <ul key={this.props.project.id}>
                                    <li>ID: {this.props.project.id}</li>
                                    <li>Name: {this.props.project.name}</li>
                                    <li>Description: {this.props.project.description}</li>
                                    <li>Status: {this.props.project.status}</li>
                                    <br></br>
                                </ul>
                            </> : <></>}
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

export default Show;
