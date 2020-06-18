import React, {Component} from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import './App.css';

import AddStudent from "./components/AddStudent";
import Student from "./components/Student";
import StudentsList from "./components/StudentsList";

function App() {
  return (
    <Router>
      <div>
        <div className="header">
          <a href="/students" className="navbar-brand" />
          <div className="">
            <li className="nav-item">
              <Link to={"/students"} className="nav-link">
                Students
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </div>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/students"]} component={StudentsList} />
            <Route exact path="/add" component={AddStudent} />
            <Route path="/students/:id" component={Student} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
