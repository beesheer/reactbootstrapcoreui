import React from 'react'
import {
  Badge,
  Button,
  ButtonDropdown,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Fade,
  Form,
  FormGroup,
  FormText,
  FormFeedback,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
  Row,
} from 'reactstrap';
import Select from 'react-select';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
];

export default class Select2 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      testInputName: '',
      testSingleSelect: null,
      testMultiSelect: [],
      validation: {testInputName: true, testSingleSelect: true, testMultiSelect: true}
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    })

    this.validate(name, value);
    console.log(this.state.validation);
  }

  validate = (name, value) => {
    console.log('validate ', name, value);
    switch (name) {
      case 'testInputName':
        this.setState({
          validation: Object.assign({}, this.state.validation, {
            [name]: value === '' ? false : true
          })
        })
        return;
      default:
        return;
    }
  }

  handleSelect2Change = (selectedOption, node) => {
    this.setState({
      testSingleSelect: selectedOption
    })
  }

  handleSelect2MultiChange = (selectedOptions, node) => {
    this.setState({
      testMultiSelect: selectedOptions
    })
  }

  onSubmit = (e) => {
    console.log(e);
    e.preventDefault();
    console.log(this.state);
    this.validate();
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm="6">
            <Form action="" method="post" className="form-horizontal" onSubmit={this.onSubmit} >
              <Card>
                <CardHeader>
                  <strong>Single Select</strong>
                  <small> Form</small>
                </CardHeader>
                <CardBody>

                  <FormGroup>
                    <Label htmlFor="inputWarning2i">Required input</Label>
                    <Input 
                      type="text" className={!this.state.validation.testInputName ? 'is-invalid' : 'is-valid'} id="inputWarning2i" required name="testInputName" value={this.state.testInputName} onChange={this.handleChange} />
                    <FormFeedback>Houston, we have a problem...</FormFeedback>
                    <FormFeedback valid className="help-block">Input provided</FormFeedback>
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="inputWarning2i">Required Select</Label>
                    <Select
                      value={this.state.testSingleSelect}
                      onChange={this.handleSelect2Change}
                      options={options}
                      name="testSingleSelect"
                    />
                    <FormFeedback className="help-block">Please provide a valid information</FormFeedback>
                  </FormGroup>

                </CardBody>
                <CardFooter>
                  <Button type="submit" size="sm" color="success"><i className="fa fa-dot-circle-o"></i> Submit</Button>
                  <Button type="reset" size="sm" color="danger"><i className="fa fa-ban"></i> Reset</Button>
                </CardFooter>
              </Card>
            </Form>
          </Col>
          <Col xs="12" sm="6">
            <Card>
              <CardHeader>
                <strong>Multiple Select</strong>
                <small> Form</small>
              </CardHeader>
              <CardBody>
                <Select
                  value={this.state.testMultiSelect}
                  onChange={this.handleSelect2MultiChange}
                  options={options}
                  isMulti
                  name="testMultiSelect"
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}