import React from 'react';
import Header from './components/Header';
import Menu from './components/Menu';
import Footer from './components/Footer';
// import Content from './components/Content';
import Users from './components/Content/Users';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
import CreateUser from './components/Content/Users/create';
import EditUser from './components/Content/Users/edit';
import Tasks from './components/Content/Tasks';
import CreateTask from './components/Content/Tasks/create';
import EditTask from './components/Content/Tasks/edit';
import Customers from './components/Content/Customers'
import CreateCustomer from './components/Content/Customers/create';
import EditCustomer from './components/Content/Customers/edit';
import Projects from './components/Content/Projects';
import CreateProject from './components/Content/Projects/create';
import EditProject from './components/Content/Projects/edit';

class App extends React.Component {

  render() {

    return (
      <div>
        <Router>
          <Switch>
            <Route exact path='/' render={() =>
              <>
                <Header />
                <Menu />
                <Footer />
              </>
            } />

            <Route path="/users" component={Users} />
            <Route path="/create-user" component={CreateUser} />
            <Route path="/edit-user" component={EditUser} />
            <Route path="/tasks" component={Tasks} />
            <Route path="/create-task" component={CreateTask} />
            <Route path="/edit-task" component={EditTask} />
            <Route path="/customers" component={Customers} />
            <Route path="/create-customer" component={CreateCustomer}/>
            <Route path="/edit-customer" component={EditCustomer} />
            <Route path="/projects" component={Projects} />
            <Route path="/create-project" component={CreateProject} />
            <Route path="/edit-project" component={EditProject} />

          </Switch>

        </Router>

      </div>

    )
  }
}

export default App;
