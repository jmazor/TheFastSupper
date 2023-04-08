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
    Collapse,
    CardBody,
    Card
  } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const CollapseComponent = (props) =>{
    const [isOpen, setIsOpen] = useState(true);
    const toggle = () => setIsOpen(!isOpen);
    const[wishlist, setWishlist] = useState('')
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
        }catch(error)
        {
            console.log(error)
        }
    }

    return (
        <div className='restaurant'>
            <img src={restaurants.imageURL} className="restaurantImg"/>
            <h1 id='name'>{restaurants.name}</h1>
            {/* <Button className='showMoreButton' color="primary" onClick={toggle} style={{ marginBottom: '0.5rem', marginLeft: '1rem', marginTop: '0.5rem' }}>
                {isOpen ? 'Hide' : 'Show More'} {change button text based on state}
            </Button> */}
            {/* <Collapse isOpen={isOpen} > */}
            <Card id='resCard'>
                <CardBody>
                    <div className='restaurantInfo'>
                    cost: {restaurants.price} <br/>
                    Address: {restaurants.address}, {restaurants.city}, {restaurants.state} {restaurants.zipCode}<br />
                    Rating: {restaurants.rating} Stars<br />
                    phone : {restaurants.phone} <br />
                    <button className='wishlistBtn' onClick={() => addToWishlist(restaurants.key)}>Add to Wish List</button>
                    <p>{wishlist}</p>
                    </div>
                </CardBody>
            </Card>
            {/* </Collapse> */}
        </div >
    )

}
export default CollapseComponent;
