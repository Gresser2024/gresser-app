import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useDispatch, useSelector } from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserPage/UserPage';
import InfoPage from '../InfoPage/InfoPage';
import LoginPage from '../LoginPage/LoginPage';
import AddEmployee from '../AddEmployee/AddEmployee';
import EditEmployee from '../AddEmployee/EditAddEmployee';
import CreateJobs from '../CreateJobs/CreateJobs';
import EditForm from '../CreateJobs/EditForm';
import JobHistory from '../JobHistory/JobHistory';
import DragDrop from '../SaveDrag/SaveDrag';
import Scheduling from '../Scheduling/Scheduling';
import Trades from '../Trades/Trades';

import './App.css';

function App() {
  const dispatch = useDispatch();
  const user = useSelector(store => store.user);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    <DndProvider backend={HTML5Backend}>
      <Router>
        <div>
          <Nav />
          <Switch>
            <Redirect exact from="/" to="/home" />

            <Route exact path="/about">
              <AboutPage />
            </Route>

            <ProtectedRoute exact path="/user">
              <div className="parent-container">
                <Scheduling />
                <Trades />
              </div>
            </ProtectedRoute>

            <ProtectedRoute exact path="/info">
              <InfoPage />
            </ProtectedRoute>

            <Route exact path="/login">
              {user.id ? <Redirect to="/user" /> : <LoginPage />}
            </Route>

            <Route exact path="/home">
              {user.id ? <Redirect to="/user" /> : <LoginPage />}
            </Route>

            <ProtectedRoute exact path="/jobs">
              <CreateJobs />
            </ProtectedRoute>

            <ProtectedRoute exact path="/edit" component={EditForm} />

            <ProtectedRoute exact path="/addemployee">
              <AddEmployee />
            </ProtectedRoute>

            <ProtectedRoute exact path="/editemployee">
              <EditEmployee />
            </ProtectedRoute>

            <ProtectedRoute exact path="/jobhistory">
              <JobHistory />
            </ProtectedRoute>

            <Route exact path="/trades">
              <Trades />
            </Route>

            <ProtectedRoute exact path="/scheduling">
              <div className="parent-container">
                <Scheduling />
                <Trades />
              </div>
            </ProtectedRoute>

            <Route>
              <h1>404</h1>
            </Route>
          </Switch>
          <Footer />
        </div>
      </Router>
    </DndProvider>
  );
}

export default App;