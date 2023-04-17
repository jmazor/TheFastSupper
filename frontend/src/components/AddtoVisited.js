import React, { useState, useEffect } from 'react';
import '../App.css';
import '../custom.css';
import config from '../config';
import { useNavigate } from "react-router-dom";
import CollapseComponent from './CollaspeComponent';
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
    Collapse,
    CardBody,
    Card,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
  } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const AddtoVisited = ({RestaurantID}) =>{
    const navigate = useNavigate()

    const addtoVisitedList = async () =>{
        let data = {
            token : localStorage.getItem("token"),
            restaurantID : RestaurantID
        }
        console.log(data.token + " token")
        console.log(data.restaurantID + " ID")
        try{
            const response = await axios.post(`${config.url}/api/history-visited`, data)
            console.log("added to visited")

        }catch(error)
        {
            console.log(error)
            if (error.response.status == 401) {
                navigate('/login')
            }
        }
    }
    
    return(
       <>
       <Button color='primary' onClick={addtoVisitedList}>Add to Visited List</Button>
       </>
    )

}
export default AddtoVisited;