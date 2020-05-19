import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ShowTask extends React.Component {

    render() {
        // console.log(this.props)
        return (
            <div>
                <Modal
                    isOpen={this.props.visible}
                    className={this.props.className}>
                    <ModalHeader>Tasks</ModalHeader>
                    <ModalBody>
                        <ul key={this.props.task.id}>
                            <li>ID : {this.props.task.id}</li>
                            <li>Name : {this.props.task.name}</li>
                            <li>Description : {this.props.task.description}</li>
                            <li>Status : {this.props.task.status}</li>
                            <li>Member: </li>
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
                            <li>Project: </li>
                            {this.props.project ? <>
                                <ul>
                                    <li>ID : {this.props.project.id}</li>
                                    <li>Name : {this.props.project.name}</li>
                                    <li>Description : {this.props.project.description}</li>
                                    <li>Status : {this.props.project.status}</li>
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

export default ShowTask;
