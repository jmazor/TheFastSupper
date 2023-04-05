import React, { useState } from 'react';
import '../App.css';
import '../custom.css';
import config from '../config';
import RestaurantCollaspe from './RestaurantCollaspe';
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

const FindRestaurants = (args) =>{
    let restaurantsList = []
    const [restaurantData, setRestaurantData] = useState('')
    const findFood = async () => {
        let food = document.getElementById("foodType").value
        console.log("Lets find some food that is like " + food)
        const data = {
          token : localStorage.getItem("token"),
          category : food
        }
    
        try
        {
          const response = await axios.post(`${config.url}/api/restaurants`, data);
          for(let i in response.data.randomRestaurants){
            console.log(response.data.randomRestaurants[i].name)
            restaurantsList.push(
            {
            key : i,
            name : response.data.randomRestaurants[i].name,
            rating : response.data.randomRestaurants[i].rating,
            city : response.data.randomRestaurants[i].location.city,
            state : response.data.randomRestaurants[i].location.state,
            zipCode : response.data.randomRestaurants[i].location.zip_code,
            country : response.data.randomRestaurants[i].location.country,
            address : response.data.randomRestaurants[i].location.address1,
            price : response.data.randomRestaurants[i].price,
            imageURL : response.data.randomRestaurants[i].image_url,
            restURL : response.data.randomRestaurants[i].url,
            phone : response.data.randomRestaurants[i].phone
            })
          }
          setRestaurantData(restaurantsList)
        } catch (error)
        {
          console.error('Error:', error);
        }
      }

    return (
        <div id='FindRestaurants'>
            <label>Enter restaurant type here</label>
            <input type='text' id='foodType'></input>
            <Button className="custom-button login-button" color="primary" onClick={findFood}>
                Find Food
            </Button>
            <div id='foodDiv'>
            {/* {restaurantData.map(restaurantData => {
                return (<RestaurantCollaspe {...{...restaurantData}} />)
            })}
            </div> */}
            <RestaurantCollaspe restaurants={restaurantData} />
        </div></div>
    )
}
export default FindRestaurants;