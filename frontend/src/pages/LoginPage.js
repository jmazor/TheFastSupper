import React, { useState } from 'react';
import '../App.css';
import '../custom.css';
import Logo from '../components/Logo';
import config from '../config';
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const [SignUpModal, setSignUpModal] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  const toggleSignUp = () => setSignUpModal(!SignUpModal);
  const toggleLogin = () => setLoginModal(!loginModal);
  const [ForgotModal, setForgotModal] = useState(false);
  const toggleForgot = () => setForgotModal(!ForgotModal);
  const [changePasswordModal, setChangePasswordModal] = useState(false);
  const toggleChangePassword = () => setChangePasswordModal(!changePasswordModal);

  const[changePasswordResult, setChangePasswordResult] = useState('')
  const[loginResult, setLoginResult] = useState('')
  const[singupResult, setSignupResult] = useState('')
  const[forgotPasswordResult, setForgotPasswordResult] = useState('')

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

    // Make the API request to backend to create a new user (update the URL accordingly)
    try
    {
      const response = await axios.post(`${config.url}/api/signup`, data);
      console.log(response.data);
    } catch (error)
    {
      console.error('Error:' + error.response.data);
      setSignupResult(error.response.data)
      return
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

    
    // Make the API request to backend to log in the user (update the URL accordingly)
    try
    {
      const response = await axios.post(`${config.url}/api/login`, data);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("name", response.data.firstName);
      if(response.data.changePassword == true){
        toggleLogin()
        toggleChangePassword()
        return
      }
      navigate('/home');
    } catch (error)
    {
      setLoginResult(error.response.data)
      console.error('Error:'+ error.response.data);
      return
    }

    // Close the modal after submitting the form
    toggleLogin();
  };

  const handleForgot = async (e) =>
  {
    e.preventDefault();
    const data = {
      email: e.target.forgotEmail.value,
    };
    try
    {
      const response = await axios.post(`${config.url}/api/forgotpassword`, data);
      console.log(response.data);
      toggleForgot();
      navigate('/');
    } catch (error)
    {
      console.error('Error:', error);
      setForgotPasswordResult(error.response.data)
    }
  };
  const handleChangePassword = async (e) =>
  {
    e.preventDefault()
    setChangePasswordResult("")
    const data = {
        token : localStorage.getItem("token"),
        oldPassword : e.target.oldPassword.value,
        newPassword : e.target.newPassword.value,
        retypePassword : e.target.retypePassword.value
    }
    if(data.retypePassword !== data.newPassword){
        console.log("Passwords do not match")
        setChangePasswordResult("Passwords do not match")
        return
    }
    try
    {
      const response = await axios.post(`${config.url}/api/change-password`, data);
      console.log(response.data);
      toggleChangePassword()
      toggleLogin()

    } catch (error)
    {
      setChangePasswordResult(error.response.data)
    }
  }

  return (
    <div className="App">
      <div className="App-header">
        <h2 id="Title">The Fast Supper</h2>
      </div>
      <div id='loginResultDiv'>
        <h1 id='loginResult'></h1>
      </div>
      
      <Logo fullscreen={true} />

      <div className="App-body">
        {/*Sign up Button*/}
        <Button className="custom-button signup-button" color="primary" onClick={toggleSignUp}>
          Sign Up
        </Button>
        {/* Login in Button*/}
        <Button className="custom-button login-button" color="primary" onClick={toggleLogin}>
          Log In
        </Button>


        {/*Modal for login, contains form elements login, password, modal for forgot password */}
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

            <h3>{loginResult}</h3>

            <ModalFooter>
              <Button color="primary" type="submit">
                Log In
              </Button>
              <Button color="secondary" onClick={toggleLogin}>
                Cancel
              </Button>
              <Button color="link" onClick={toggleForgot}>
                Forgot Password?
              </Button>
            </ModalFooter>
          </Form>
        </Modal>
        
        
        {/*Modal for forgot password */}
        <Modal isOpen={ForgotModal} toggle={toggleForgot}>
          <Form onSubmit={handleForgot}>
            <ModalHeader toggle={toggleForgot}>Forgot Password</ModalHeader>
            <ModalBody>
              <FormGroup>
                <Label for="forgotEmail">Enter Email:</Label>
                <Input type="email" name="forgotEmail" id="forgotEmail" required />
              </FormGroup>
            </ModalBody>

            <h3>{forgotPasswordResult}</h3>
            
            <ModalFooter>
              <Button color="primary" type="submit">
                Reset Password
              </Button>
              <Button color="secondary" onClick={toggleForgot}>
                Cancel
              </Button>
            </ModalFooter>
          </Form>
        </Modal>


        {/*Modal for sign up */}
        <Modal isOpen={SignUpModal} toggle={toggleSignUp}>
          <Form onSubmit={handleSubmit}>
            <ModalHeader toggle={toggleSignUp}>Sign Up</ModalHeader>
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

            <h3>{singupResult}</h3>

            <ModalFooter>
              <Button color="primary" type="submit">
                Sign Up
              </Button>

              <Button color="secondary" onClick={toggleSignUp}>
                Cancel
              </Button>
            </ModalFooter>
          </Form>
        </Modal>
        
        {/*Modal for change password*/}
        <Modal isOpen={changePasswordModal} toggle={toggleChangePassword}>
          <Form onSubmit={handleChangePassword}>
            <ModalHeader toggle={toggleChangePassword}>Change Password</ModalHeader>
            <ModalBody>
              <FormGroup>
                <Label for="oldPassword">Old Password</Label>
                <Input type="password" name="oldPassword" id="oldPassword" required />
              </FormGroup>

              <FormGroup>
                <Label for="newPassword">New Password</Label>
                <Input type="password" name="lastName" id="newPassword" required />
              </FormGroup>

              <FormGroup>
                <Label for="retypePassword">Re-enter Password</Label>
                <Input type="password" name="retypePassword" id="retypePassword" required />
              </FormGroup>
            </ModalBody>

            <h3>{changePasswordResult}</h3>

            <ModalFooter>
              <Button color="primary" type="submit">
                Change Password
              </Button>

              <Button color="secondary" onClick={toggleChangePassword}>
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
