import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import {
  userLogout
} from '../../actions' // Improve this import...

class Logout extends Component {
  render() {
    this.props.dispatch(userLogout())
    this.props.history.push('/login');
    return (
      <div className="app flex-row align-items-center">
        Logging out...
      </div>
    );
  }
}

export default connect()(withRouter(Logout))
