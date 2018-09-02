import React, { Component } from 'react';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import {withRouter} from 'react-router-dom'

class LoadingApp extends Component {
  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
          <i className="fa fa-spinner"></i> Loading...
          </Row>
        </Container>
      </div>
    );
  }
}

export default withRouter(LoadingApp);
