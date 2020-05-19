import React, { Component } from 'react';
import LoginModal from './loginModal';

export default class Menu extends Component {
    state = {
        isOpen: false,
        loginModalVisible: false,
        search: "",
        username: "",
        password: "",
        remember_me: false,
    };

    toggleLoginModalVisible = () => {
        this.setState({
            loginModalVisible: !this.state.loginModalVisible
        });
    };

    onUsernameOnChange = (event) => {
        this.setState({
            username: event.target.value
        })
    }
    onPasswordlOnChange = (event) => {
        this.setState({
            password: event.target.value
        })
    }
    onRemember_meOnChange = () => {
        this.setState({
            remember_me: !this.state.remember_me
        })
    }

    login = async payload => {
        try {
            let response = await this.props.onLogin(payload);
            if (response.status === 201) {
                alert("Login Succesful");
            } else {
                alert("Login failed !");
            }
        } catch (err) {
            alert(err);
        } finally {
            this.toggleLoginModalVisible();
        }
    }

    render() {
        return (
            <div>
                <>
                    {/* Main Sidebar Container */}
                    <aside className="main-sidebar sidebar-dark-primary elevation-4">
                        {/* Brand Logo */}
                        <a href="index3.html" className="brand-link">
                            <img src="https://scontent.fhan3-2.fna.fbcdn.net/v/t1.0-9/14390728_1149629498463908_9146936282026535044_n.jpg?_nc_cat=103&_nc_sid=85a577&_nc_ohc=YDG4Nm4i9E8AX85ozfO&_nc_ht=scontent.fhan3-2.fna&oh=e2b80506ab357b361a972b3eb86f8fc7&oe=5ECF45A1" className="img-circle elevation-2" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{ opacity: '.8' }} />
                            <span className="brand-text font-weight-light">Haposoft</span>
                        </a>
                        {/* Sidebar */}
                        <div className="sidebar">
                            {/* Sidebar user panel (optional) */}
                            <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                                <div className="info">
                                    {!this.props.isAuthed ?
                                        <div >
                                            <a href="#" onClick={this.toggleLoginModalVisible} className="pl-7" style={{paddingLeft:"70px", fontSize:"20px"}} >Login</a>
                                        </div> : <div className="d-flex" style={{marginLeft:"-15px"}}>
                                        <div className="image">
                                            <img src="https://scontent.fhan3-2.fna.fbcdn.net/v/t1.0-9/14390728_1149629498463908_9146936282026535044_n.jpg?_nc_cat=103&_nc_sid=85a577&_nc_ohc=YDG4Nm4i9E8AX85ozfO&_nc_ht=scontent.fhan3-2.fna&oh=e2b80506ab357b361a972b3eb86f8fc7&oe=5ECF45A1" className="img-circle elevation-2" alt="Hapo User" />
                                        </div>
                                        {/* {this.props.admin ? <><a>Admin</a></> :<><a>User</a></>} */}
                                        <span className="d-block pl-3 pt-1 text-white">Hi, {this.props.author.name} /</span>
                                        <a href="#" onClick={this.props.onLogout} className="d-block pl-1 pt-1">Logout</a>
                                        </div>
                                    }
                                </div>
                            </div>
                            {/* Sidebar Menu */}
                            <nav className="mt-2">
                                <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                                    <li className="nav-header">MANAGEMENT</li>
                                    {this.props.isAuthed ? <>
                                        <li className="nav-item" onClick={ this.props.visibleMember }>
                                        <a href="#" className="nav-link">
                                            <i className="nav-icon far fa-user" />
                                            <p>
                                                Members
             
                                            </p>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="#" className="nav-link" onClick={ this.props.visibleProject }>
                                            <i className="nav-icon fas fa-calendar-alt" />
                                            <p>
                                                Projects
            
                                            </p>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="#" className="nav-link" onClick={ this.props.visibleTask }>
                                            <i className="nav-icon nav-icon fas fa-tasks" />
                                            <p>
                                                Tasks
           
                                            </p>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="#" className="nav-link" onClick={ this.props.visibleCustomer }>
                                            <i className="nav-icon fas fa-user" />
                                            <p>
                                                Customers
          
                                            </p>
                                        </a>
                                    </li>
                                    </> :<></>}
                                    
                                </ul>
                            </nav>
                            {/* /.sidebar-menu */}
                        </div>
                        {/* /.sidebar */}
                    </aside>

                    <LoginModal
                        visible={this.state.loginModalVisible}
                        onToggle={this.toggleLoginModalVisible}
                        submit={this.login}
                    />
                </>
                }

            </div >

        )
    }
}
