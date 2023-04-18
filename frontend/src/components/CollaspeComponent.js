import React, { useState } from 'react';
// import '../App.css';
// import '../custom.css';
import '../loggedin.css';
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
    Collapse,
    CardImg,
    CardBody,
    Alert,
    Card
  } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import GetReviews from './GetReviews';
import AddReview from './AddReview';

const CollapseComponent = (props) =>{
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(true);
    const toggle = () => setIsOpen(!isOpen);
    const[wishlist, setWishlist] = useState('')
    const[visible, setVisible] = useState(false)
    const onDismiss = () => {setVisible(!visible);}
    const { restaurants } = props

    const addToWishlist = async(key) =>{
       const data = {
            token : localStorage.getItem("token"),
            restaurantID : key,
            liked : true
        }
        console.log(data.restaurantID)
        try{
            const response = await axios.post(`${config.url}/api/history-new`, data)
            console.log("item successfully added to wishlist")
            setWishlist("Item added to wishlist")
            setVisible(true)
        }catch(error)
        {
            console.log(error)
            if(error.response.status == 401){
                navigate('/login')
              }

        }
    }

    return (
      <div className="card">
        <img src={restaurants.imageURL} className="card-img-top" alt="Restaurant Image" />
        <div className="card-body">
          <h1 className="card-title">{restaurants.name}</h1>
          <p className="card-text">
            <b>Address:</b> {restaurants.address}, {restaurants.city}, {restaurants.state} {restaurants.zipCode}<br />
            <b>Phone:</b> {restaurants.phone} <br/>
            <b>Cost:</b> {restaurants.price} <br/>
            <b>Tag:</b> {restaurants.tag} <br/> 
            <b>Rating:</b> {restaurants.rating} Stars <GetReviews restaurant={restaurants}/> <br/>
          </p>
        </div>
      </div>
      );
    }   
export default CollapseComponent;
