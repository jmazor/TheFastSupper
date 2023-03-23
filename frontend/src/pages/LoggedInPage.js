import React, { useState } from 'react';
import '../App.css';
import '../custom.css';
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

const LoggedInPage = () =>
{
  const [modal, setModal] = useState(false);
  const [logoutModal, setLogoutModal] = useState(false);
  const toggle = () => setModal(!modal);
  const toggleLogin = () => setLoginModal(!loginModal);
  const navigate = useNavigate();
  const Logout = () => {
    navigate("/login");
  }

  return (
    <div className="App">
        <div className="App-header">
        <h2 id="Title">The Fast Supper</h2>
        </div>
        <div id='Greeting div'>
          <h1 id='Greeting'></h1>
        </div>
        <div className="App-body">
          {/* Logout Button*/}
          <Button className="custom-button login-button" color="primary" onClick={Logout}>
            Log out
          </Button>
        </div>
    </div>
);
};

export default LoggedInPage;
