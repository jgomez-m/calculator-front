import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './components/Login';
import NewOperation from './components/NewOperation';
import UserRecords from './components/UserRecords';
import { UserProvider } from './context/UserContext';

function App() {
  return (
    <Router>
      <UserProvider>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/new-operation" component={NewOperation} />
          <Route path="/user-records" component={UserRecords} />
        </Switch>
      </div>
      </UserProvider>
    </Router>
  );
}

export default App;
