import React, { useState } from 'react';
import '../App.css';
import '../custom.css';
import FindRestaurants from '../components/FindRestaurants';
import config from '../config';
import { useNavigate } from "react-router-dom";
import Logo from '../components/Logo';
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

const LoggedInPage = () =>
{
  const [modal, setModal] = useState(false);
  const [logoutModal, setLogoutModal] = useState(false);
  const toggle = () => setModal(!modal);
  const toggleLogin = () => setLoginModal(!loginModal);
  const navigate = useNavigate();
  const firstName = localStorage.getItem("name");
  let greet = "Welcome Back, " + firstName;

  const Logout = () => {
    navigate("/login");
  }

  return (
    <div>
        <div className="App-header-2">
          {/* <h2 id="Title">The Fast Supper</h2> */}
          <Logo fullscreen={false}/>
          <h1 id='Greeting' className='Title-centered'>{greet}</h1>
        </div>

        <div className="App-body">
          {/* Logout Button*/}
          <Button className="logout-button" color="primary" onClick={Logout}>
            Log out
          </Button>
        </div>
        
        <FindRestaurants/>
    </div>
);
};

export default LoggedInPage;
