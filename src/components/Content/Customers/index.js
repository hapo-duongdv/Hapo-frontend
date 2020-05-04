import React, { Component } from 'react'
import { Table, Button, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import './../../../css/Table.css'

export default class Customers extends Component {
    render() {
        return (
            <div className="table">
                <Button color="secondary" className="text-white" href="/">BACK</Button>
                <h3 className="pb-20">Management Customer</h3>
                <Button color="primary" className="text-white" href="/create-customer">CREATE</Button>
                <Table responsive striped>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Full Name</th>
                            <th>Gender</th>
                            <th>Email</th>
                            <th>Address</th>
                            <th>Phone</th>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>Mark Otto</td>
                            <td>Male</td>
                            <td>Mark.Hapo@hapo.com</td>
                            <td>Ha Noi</td>
                            <td>0255611844</td>
                            <td><Button color="secondary">READ</Button>{' '}</td>
                            <td><Button href="/edit-customer" color="success">EDIT</Button>{' '}</td>
                            <td><Button color="danger">DELETE</Button>{' '}</td>
                        </tr>
                        <tr>
                            <th scope="row">2</th>
                            <td>Mark Otto</td>
                            <td>Male</td>
                            <td>Mark.Hapo@hapo.com</td>
                            <td>Ha Noi</td>
                            <td>0255611844</td>
                            <td><Button color="secondary">READ</Button>{' '}</td>
                            <td><Button href="/edit-customer" color="success">EDIT</Button>{' '}</td>
                            <td><Button color="danger">DELETE</Button>{' '}</td>
                        </tr>
                        <tr>
                            <th scope="row">3</th>
                            <td>Mark Otto</td>
                            <td>Male</td>
                            <td>Mark.Hapo@hapo.com</td>
                            <td>Ha Noi</td>
                            <td>0255611844</td>
                            <td><Button color="secondary">READ</Button>{' '}</td>
                            <td><Button href="/edit-customer" color="success">EDIT</Button>{' '}</td>
                            <td><Button color="danger">DELETE</Button>{' '}</td>
                        </tr>
                        <tr>
                            <th scope="row">4</th>
                            <td>Mark Otto</td>
                            <td>Male</td>
                            <td>Mark.Hapo@hapo.com</td>
                            <td>Ha Noi</td>
                            <td>0255611844</td>
                            <td><Button color="secondary">READ</Button>{' '}</td>
                            <td><Button href="/edit-customer" color="success">EDIT</Button>{' '}</td>
                            <td><Button color="danger">DELETE</Button>{' '}</td>
                        </tr>
                        <tr>
                            <th scope="row">5</th>
                            <td>Mark Otto</td>
                            <td>Male</td>
                            <td>Mark.Hapo@hapo.com</td>
                            <td>Ha Noi</td>
                            <td>0255611844</td>
                            <td><Button color="secondary">READ</Button>{' '}</td>
                            <td><Button href="/edit-customer" color="success">EDIT</Button>{' '}</td>
                            <td><Button color="danger">DELETE</Button>{' '}</td>
                        </tr>
                    </tbody>
                </Table>
                <Pagination aria-label="Page navigation example">
                    <PaginationItem>
                        <PaginationLink first href="#" />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink previous href="#" />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#">1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#">2</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#">3</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#">4</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#">5</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink next href="#" />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink last href="#" />
                    </PaginationItem>
                </Pagination>
            </div>
        )
    }
}
