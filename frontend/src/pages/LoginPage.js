import React, { useState } from 'react';
import '../App.css';
import '../custom.css';
import '../LoginPage.css';
import config from '../config';
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

const LoginPage = () =>
{
  const [modal, setModal] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  const toggle = () => setModal(!modal);
  const toggleLogin = () => setLoginModal(!loginModal);


  const handleSubmit = async (e) =>
  {
    let result = document.getElementById("loginResult")
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
      const response = await axios.post(`${config.url}/api/signup`, data);
      console.log(response.data);
    } catch (error)
    {
      console.error('Error:', error);
      result.innerHTML = error
    }

    // Close the modal after submitting the form
    toggle();
  };

  const handleLogin = async (e) =>
  {
    let result = document.getElementById("loginResult")
    e.preventDefault();
    const data = {
      email: e.target.loginEmail.value,
      password: e.target.loginPassword.value,
    };

    // Make the API request to your backend to log in the user (update the URL accordingly)
    try
    {
      const response = await axios.post(`${config.url}/api/login`, data);
      console.log(response.data);
      result.innerHTML = "Welcome " + response.data.firstName
      localStorage.setItem("token", response.data.token)
    } catch (error)
    {
      result.innerHTML = error
      console.error('Error:', error);
    }

    // Close the modal after submitting the form
    toggleLogin();
  };

  return (
    <div className="App">
      <div className="App-header">
        <h2 id="Title">The Fast Supper</h2>
      </div>
      <div id='loginResultDiv'>
        <h1 id='loginResult'></h1>
      </div>

      <div className="App-body">
        {/*Sign up Button*/}
        <Button className="custom-button" color="primary" onClick={toggle}>
          Sign Up
        </Button>
        {/* Login in Button*/}
        <Button className="custom-button login-button" color="primary" onClick={toggleLogin}>
          Log In
        </Button>


        {/*Modal for login, contains form elements login, password */}
        <Modal isOpen={loginModal} toggle={toggleLogin}>
          <Form onSubmit={handleLogin}>

          <ModalHeader toggle={toggleLogin}>Log In</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="loginEmail">Email</Label>
              <Input type="email" name="loginEmail" id="loginEmail" required />
            </FormGroup>

            <FormGroup>
              <Label for="loginPassword">Password</Label>
              <Input type="password" name="loginPassword" id="loginPassword" required />
            </FormGroup>
          </ModalBody>
          
          <ModalFooter>
              
              <Button color="primary" type="submit">
                Log In
              </Button>
              
              <Button color="secondary" onClick={toggleLogin}>
                Cancel
              </Button>          
              
              </ModalFooter>
          </Form>
        </Modal>

        {/*Modal for sign up */}
        <Modal isOpen={modal} toggle={toggle}>
          <Form onSubmit={handleSubmit}>
            <ModalHeader toggle={toggle}>Sign Up</ModalHeader>
            <ModalBody>
              
              {/*Contains form elements first name, last name, email, password */}
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
                <Input type="email" name="email" id="email" required placeholder='Example@test.com'/>
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

export default LoginPage;
