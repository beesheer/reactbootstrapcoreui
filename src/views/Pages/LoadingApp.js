import React, { Component } from 'react';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';

export default class LoadingApp extends Component {
  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <span>
              <i className="fa fa-spinner fa-pulse"></i> Loading...
              </span>
          </Row>
        </Container>
      </div>
    );
  }
}
