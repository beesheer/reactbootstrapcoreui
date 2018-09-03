// Styles
// CoreUI Icons Set
import '@coreui/icons/css/coreui-icons.min.css';
// Import Flag Icons Set
import 'flag-icon-css/css/flag-icon.min.css';
// Import Font Awesome Icons Set
import 'font-awesome/css/font-awesome.min.css';
import React, { Component } from 'react';
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom';
// Import Simple Line Icons SetRedirRedirect
import 'simple-line-icons/css/simple-line-icons.css';
import './App.css';
// Containers
import { DefaultLayout } from './containers';
// Import Main styles for this application
import './scss/style.css';
// Pages
import { Logout, Login, Page404, Page500, Register, LoadingApp } from './views/Pages';
import { connect } from 'react-redux';


// import { renderRoutes } from 'react-router-config';

class RootApp extends Component {
  render() {
    // The app is still loading
    if (this.props.appIsLoading) {
      return <LoadingApp />
    }

    // The app has loaded
    return (
      <HashRouter>
        <Switch>
          <Route exact path="/login" name="Login Page" component={Login} />
          <Route exact path="/logout" name="Logout" component={Logout} />
          <Route exact path="/register" name="Register Page" component={Register} />
          <Route exact path="/404" name="Page 404" component={Page404} />
          <Route exact path="/500" name="Page 500" component={Page500} />

          // Auth check
          <Route path="/" name="Home"
            // Protected
            render={(props) => (
              this.props.username !== '' ? <DefaultLayout {...props} /> : <Redirect to='/login' />
            )}
          />
        </Switch>
      </HashRouter>
    );
  }
}

function mapStateToProps(state) {
  const { appIsLoading, appData} = state.appInit;
  const { username, userdata} = state.user;
  return {
    appIsLoading,
    appData,
    username,
    userdata
  }
}
export default connect(mapStateToProps)(RootApp)
