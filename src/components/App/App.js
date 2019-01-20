import React, { Component } from 'react';
import { connect } from 'react-redux';

// router import
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';


// Component imports
import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import AboutPage from '../AboutPage/AboutPage';
import ProfileForm from '../Profile/ProfileForm';
import ViewProfile from '../Profile/ViewProfile';
import Dashboard from '../Dashboard/Dashboard';
import PolicyForm from '../Policy/PolicyForm';
import BenefitPaidForm from '../Policy/BenefitPaidForm';
import EditProfile from '../Profile/EditProfile';
import EditPolicy from '../Policy/EditPolicy';
import UpdatePaidBenefits from '../Policy/UpdatePaidBenefits';


// css style import
import './App.css';



class App extends Component {
  
  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_USER' })
  }

  render() {
    return (
      <Router>
        <div>
          <Nav />
          <div className="div-style">

            <Switch>
              {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
              <Redirect exact from="/" to="/home" />
              {/* Visiting localhost:3000/about will show the about page.
            This is a route anyone can see, no login necessary */}
              <Route
                exact
                path="/about"
                component={AboutPage}
              />
              {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/home will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the 'Login' or 'Register' page.
            Even though it seems like they are different pages, the user is always on localhost:3000/home */}
              <ProtectedRoute
                exact
                path="/home"
                component={Dashboard}
              />
  

              {/* profile page for user to view */}
              {/* My webpage Routes */}
              {/* route to add user profile */}
              <ProtectedRoute path='/add_profile' component={ProfileForm} />
              {/* route to view user profile */}
              <ProtectedRoute path='/view_profile' component={ViewProfile} />
              <ProtectedRoute path='/add_policy' component={PolicyForm} />
              <ProtectedRoute path='/add_paid_benefit' component={BenefitPaidForm} />
              <ProtectedRoute path='/edit_profile' component={EditProfile} />
              <ProtectedRoute path='/edit_policy' component={EditPolicy} />
              <ProtectedRoute path='/update_paid_benefit' component={UpdatePaidBenefits} />
              <ProtectedRoute path='/dashboard' component={Dashboard} />
              

              {/* If none of the other routes matched, we will show a 404. */}
              <Route render={() => <h1>404</h1>} />
            </Switch>

          </div>

          <Footer />
        </div>
      </Router>
    )
  }
}

export default connect()(App);
