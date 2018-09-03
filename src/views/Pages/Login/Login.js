import React, { Component } from 'react';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import {
  userLogin
} from '../../../actions' // Improve this import...
class Login extends Component {
  constructor(props) {
    super(props)
  }

  userInfo = {
    username: '',
    password: '',
  }

  validation = { username: true, password: true}

  validate = (name, value) => {
    switch (name) {
      case 'username':
        this.validation = Object.assign(this.validation, {
          [name]: value === '' ? false : true
        });
        return;
      case 'password':
        this.validation = Object.assign(this.validation, {
          [name]: value === '' ? false : true
        })
        return;
      default:
        return;
    }
  }

  onChange = (event) => {
    const target = event.target
    const value = target.value
    const name = target.name

    this.userInfo = Object.assign(this.userInfo, {
      [name]: value
    })
  }

  handleOnRegisterClick = () => {
    this.props.history.push('/register');
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.validate('username', this.userInfo.username);
    this.validate('password', this.userInfo.password);

    if (this.props.isLoggingIn || this.userInfo.username === '' || this.userInfo.password === '') {
      return false;
    }
    const { dispatch } = this.props;
    dispatch(userLogin(this.userInfo.username, this.userInfo.password))
  }

  render() {
    if (this.props.username !== '') {
      this.props.history.push('/dashboard');
    }
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form onSubmit={this.onSubmit}>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input 
                          className={!this.validation.username ? 'is-invalid' : 'is-valid'}
                          type="text" name="username" placeholder="Username" autoComplete="username" onChange={this.onChange} />
                        <FormFeedback>Please enter username</FormFeedback>
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input 
                          className={!this.validation.password ? 'is-invalid' : 'is-valid'}
                          type="password" name="password" placeholder="Password" autoComplete="current-password" onChange={this.onChange} />
                          <FormFeedback>Please enter password</FormFeedback>
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button color="primary" className="px-4" disabled={this.props.isLoggingIn ? true : false}>
                            {this.props.isLoggingIn ? <span><i className="fa fa-spinner fa-pulse"></i> Logging In</span> : <span>Login</span>} 
                          </Button>
                        </Col>
                        <Col xs="6" className="text-right">
                          <Button color="link" className="px-0">Forgot password?</Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: 44 + '%' }}>
                  <CardBody className="text-center">
                    <div>
                      <h2>Sign up</h2>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua.</p>
                      <Button color="primary" className="mt-3" active onClick={this.handleOnRegisterClick}>Register Now!</Button>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { username, isLoggingIn, userData } = state.user
  return {
    username,
    isLoggingIn,
    userData
  }
}

export default connect(mapStateToProps)(withRouter(Login))
