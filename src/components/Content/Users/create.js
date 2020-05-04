import React, { Component } from 'react';
import { Label, Input, Form, Row, Col, FormGroup, Button } from 'reactstrap';

export default class CreateUser extends Component {
    render() {
        return (
            <div className="w-50 mx-auto">
                <h3 className="pb-20 pt-30">Create User</h3>
                <Form>
                    <Row form>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="exampleUsername">Username</Label>
                                <Input type="text" name="username" placeholder="username..." />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="examplePassword">Password</Label>
                                <Input type="password" name="password" placeholder="password..." />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row form>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="exampleCity">Full name</Label>
                                <Input type="text" name="name" placeholder="your name..."/>
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="exampleState">Age</Label>
                                <Input type="number" name="age"/>
                            </FormGroup>
                        </Col>
                        <Col md={2}>
                            <FormGroup>
                                <Label for="exampleSelect">Gender</Label>
                                <Input type="select" name="select" id="exampleSelect">
                                    <option>Male</option>
                                    <option>Falmale</option>
                                </Input>
                            </FormGroup>
                        </Col>
                    </Row>
                    <FormGroup>
                        <Label for="exampleAddress">Address</Label>
                        <Input type="text" name="address" placeholder="1234 Main St" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleEmail">Email</Label>
                        <Input type="email" name="email" placeholder="abc@hapo.com" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="examplePhone">Phone</Label>
                        <Input type="text" name="phone" placeholder="phone number...." />
                    </FormGroup>
                    <FormGroup>
                        <Label for="examplePosition">Position</Label>
                        <Input type="text" name="position"  placeholder="poition...." />
                    </FormGroup>
                    <FormGroup check>
                        <Input type="checkbox" name="check" id="exampleCheck" />
                        <Label for="exampleCheck" check>I agree with the rule</Label>
                    </FormGroup>
                    <Button color="primary">Create</Button>
                </Form>
            </div>
        )
    }
}
