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
  { value: '', label: '--Please select--' },
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
    }
    this.handleChange = this.handleChange.bind(this);
  }

  validation = { testInputName: true, testSingleSelect: true, testMultiSelect: true }

  handleChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    })

    this.validate(name, value);
    console.log(this.validation);
  }

  validate = (name, value) => {
    console.log('validate ', name, value);
    switch (name) {
      case 'testInputName':
        this.validation = Object.assign(this.validation, {
          [name]: value === '' ? false : true
        });
        return;
      case 'testSingleSelect':
        this.validation = Object.assign(this.validation, {
          [name]: value === '' ? false : true
        })
        return;
      case 'testMultiSelect':
        this.validation = Object.assign(this.validation, {
            [name]: value > 0 ? true: false
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
    this.validate('testSingleSelect', selectedOption.value);
  }

  handleSelect2MultiChange = (selectedOptions, node) => {
    this.setState({
      testMultiSelect: selectedOptions
    })

    this.validate('testMultiSelect', selectedOptions.length);
  }

  onSubmit = (e) => {
    console.log(e);
    e.preventDefault();
    
    // Need to validate all inputs
    this.validate('testInputName', this.state.testInputName);
    this.validate('testSingleSelect', this.state.testSingleSelect == null ? '' : this.state.testSingleSelect.value);
    this.validate('testMultiSelect', this.state.testMultiSelect.length);

    console.log(this.state);

    // Check all the validation state
    let isValid = true;
    Object.keys(this.validation).forEach((key) => {
      if (this.validation[key] === false) {
        isValid = false;
      }
    });

    this.forceUpdate();

    if(!isValid) {
      alert('Form is INVALID');
    } else {
      alert('Nice Job!');
    }
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
                      type="text" className={!this.validation.testInputName ? 'is-invalid' : 'is-valid'} id="inputWarning2i" name="testInputName" value={this.state.testInputName} onChange={this.handleChange} />
                    <FormFeedback>Houston, we have a problem...</FormFeedback>
                    <FormFeedback valid className="help-block">Input provided</FormFeedback>
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="inputWarning2i">Required Select</Label>
                    <Select
                      className={!this.validation.testSingleSelect ? 'is-invalid' : 'is-valid'}
                      value={this.state.testSingleSelect}
                      onChange={this.handleSelect2Change}
                      options={options}
                      name="testSingleSelect"
                    />
                  </FormGroup>
                  {
                    !this.validation.testSingleSelect && <div className="invalid-feedback" style={{display: 'block'}}>Houston, we have a problem...</div>
                  }

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
                {
                  !this.validation.testMultiSelect && <div className="invalid-feedback" style={{display: 'block'}}>Please choose at least one</div>
                }
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}