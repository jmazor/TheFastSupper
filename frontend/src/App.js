import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import
  {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Label,
    Input,
  } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const App = () =>
{
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const handleSubmit = async (e) =>
  {
    e.preventDefault();
    const data = {
      firstName: e.target.firstName.value,
      lastName: e.target.lastName.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };

    // Make the API request to your backend to create a new user (update the URL accordingly)
    try
    {
      const response = await axios.post('https://fastsupper.herokuapp.com/api/signup', data);
      console.log(response.data);
    } catch (error)
    {
      console.error('Error:', error);
    }

    // Close the modal after submitting the form
    toggle();
  };

  return (
    <div className="App">
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>The Fast Supper</h2>
      </div>
      <div className="App-intro">
        <Button color="primary" onClick={toggle}>
          Sign Up
        </Button>

        <Modal isOpen={modal} toggle={toggle}>
          <Form onSubmit={handleSubmit}>
            <ModalHeader toggle={toggle}>Sign Up</ModalHeader>
            <ModalBody>
              <FormGroup>
                <Label for="firstName">First Name</Label>
                <Input type="text" name="firstName" id="firstName" required />
              </FormGroup>
              <FormGroup>
                <Label for="lastName">Last Name</Label>
                <Input type="text" name="lastName" id="lastName" required />
              </FormGroup>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input type="email" name="email" id="email" required />
              </FormGroup>
              <FormGroup>
                <Label for="password">Password</Label>
                <Input type="password" name="password" id="password" required />
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" type="submit">
                Sign Up
              </Button>
              <Button color="secondary" onClick={toggle}>
                Cancel
              </Button>
            </ModalFooter>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default App;
