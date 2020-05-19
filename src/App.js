import React from 'react';
import Header from './components/Header';
import Menu from './components/Menu';
import Footer from './components/Footer';
import { Route, Switch, BrowserRouter as Router, withRouter } from 'react-router-dom'
import Tasks from './components/Content/Tasks';
import CreateTask from './components/Content/Tasks/create';
import EditTask from './components/Content/Tasks/edit';
import Customers from './components/Content/Customers'
import CreateCustomer from './components/Content/Customers/create';
import EditCustomer from './components/Content/Customers/edit';
import Projects from './components/Content/Projects';
import CreateProject from './components/Content/Projects/create';
import EditProject from './components/Content/Projects/edit';
import LoginModal from './components/Menu/loginModal';
import axios from 'axios'
import Members from './components/Content/Members';
import Create from './components/Content/Members/create';
import Edit from './components/Content/Members/edit';
import Show from './components/Content/Members/show';
import Login from './components/Menu/login';
import Search from './components/Header/Search'

class App extends React.Component {

  state = {
    authedUser: null,
    roles: null,
    visibleMember: false,
    visibleTask: false,
    visibleProject: false,
    visibleCustomer: false,
  }

  onVisibleMember = () => {
    this.setState({
      visibleMember: !this.state.visibleMember,
    })
    if (this.state.visibleCustomer=== true || this.state.visibleProject === true || this.state.visibleTask === true) {
      this.setState({
        visibleCustomer: this.state.visibleCustomer === false,
        visibleProject: this.state.visibleProject === false,
        visibleTask: this.state.visibleTask === false
      })
    }
  }

  onVisibleTask = () => {
    this.setState({
      visibleTask: !this.state.visibleTask
    })
    if (this.state.visibleCustomer=== true || this.state.visibleMember === true || this.state.visibleProject === true) {
      this.setState({
        visibleCustomer: this.state.visibleCustomer === false,
        visibleMember: this.state.visibleMember === false,
        visibleProject: this.state.visibleProject === false
      })
    }
  }

  onVisibleProject = () => {
    this.setState({
      visibleProject: !this.state.visibleProject,
    })
    if (this.state.visibleCustomer=== true || this.state.visibleMember === true || this.state.visibleTask === true) {
      this.setState({
        visibleCustomer: this.state.visibleCustomer === false,
        visibleMember: this.state.visibleMember === false,
        visibleTask: this.state.visibleTask === false
      })
    }
  }

  onVisibleCustomer = () => {
    this.setState({
      visibleCustomer: !this.state.visibleCustomer,
    })
    if (this.state.visibleProject=== true || this.state.visibleMember === true || this.state.visibleTask === true) {
      this.setState({
        visibleProject: this.state.visibleProject === false,
        visibleMember: this.state.visibleMember === false,
        visibleTask: this.state.visibleTask === false
      })
    }
  }

  login = async values => {
    const response = await axios.post('http://localhost:4000/users/login', {
      username: values.username,
      password: values.password
    })
    if (response.status === 201) {
      this.setState({
        authedUser: response.data,
        roles: response.data.roles
      });
      localStorage.setItem("jwt_token", response.data.token)
    }
    return response;
  };

  logout() {
    localStorage.clear();
  }

  // search = (keyworrd) => {
  //   console.log(this.props)
  //   this.props.history.push(`/search?q=${keyworrd}`)
  // }


  async componentDidMount() {
    const token = localStorage.getItem("jwt_token");
    const currentUser = (await this.getCurrentUser(token));
    const user = await this.getInforUser(currentUser.id);
    axios.defaults.headers.common["Authorization"] = `Bearer ${user.data.token}`
    this.setState({
      authedUser: user.data,
      roles: user.data.roles
    })
  }

  getInforUser = async id => {
    const token = localStorage.getItem("jwt_token");
    const AuthStr = 'Bearer ' + token;
    const user = await axios.get(`http://localhost:4000/users/${id}`, { headers: { 'Authorization': AuthStr } })
    localStorage.setItem("jwt_token", user.data.token)
    return user;
  }


  getCurrentUser = async tokens => {
    const token = localStorage.getItem("jwt_token");
    const AuthStr = 'Bearer ' + token;
    const response = await axios.get(`http://localhost:4000/users/me/${tokens}`, { headers: { 'Authorization': AuthStr } })
    if (response.status !== 201) {
      // throw error
    }
    return response.data;
  }


  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route exact path='/' render={() =>
              <>
                <Header history={this.props.history} />
                <Menu
                  visibleMember={this.onVisibleMember}
                  visibleTask={this.onVisibleTask}
                  visibleCustomer={this.onVisibleCustomer}
                  visibleProject={this.onVisibleProject}
                  admin={this.state.roles === 'admin'}
                  onLogin={this.login}
                  onLogout={this.logout}
                  isAuthed={this.state.authedUser !== null}
                  author={this.state.authedUser}
                />
                {this.state.visibleMember ? <>
                  <Members user={this.state.authedUser} admin={this.state.roles === 'admin'} />
                </> : <></>}
                {this.state.visibleTask ? <>
                  <Tasks user={this.state.authedUser} admin={this.state.roles === 'admin'} />
                </> : <></>}
                {this.state.visibleProject ? <>
                  <Projects user={this.state.authedUser} admin={this.state.roles === 'admin'} />
                </> : <></>}
                {this.state.visibleCustomer ? <>
                  <Customers user={this.state.authedUser} admin={this.state.roles === 'admin'} />
                </> : <></>}
                <Footer />
              </>
            } />
            <Route path="/create-member" component={Create} />
            <Route path="/edit" component={Edit} />
            <Route path="/search" component={Search} />
            <Route path="/show" component={Show} />
            <Route path="/modalLogin" component={LoginModal} />
            <Route path="/create-task" component={CreateTask} />
            <Route path="/edit-task" component={EditTask} />
            <Route path="/create-customer" component={CreateCustomer} />
            <Route path="/edit-customer" component={EditCustomer} />
            <Route path="/create-project" component={CreateProject} />
            <Route path="/edit-project" component={EditProject} />
            <Route path="/login" component={Login} />
          </Switch>
    
        </Router>

      </div>

    )
  }
}

export default App;
