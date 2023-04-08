import React, { useState, useEffect } from 'react';
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
    const [restaurantData, setRestaurantData] = useState([])

    useEffect(() => {
      const fetchData = async () => {
          await findFood(); // await the function call
          // set restaurantData to the fetched data
          setRestaurantData(restaurantsList);
      }
      fetchData();
    }, []);

    const [selectedRestaurantIndex, setSelectedRestaurantIndex] = useState(0);
  
    const updateSelectedRestaurantIndex = (index) => {
      setSelectedRestaurantIndex(index);
    };
    const checkIndex = () => {
      if (selectedRestaurantIndex == restaurantData.length - 1) 
      {
        findFood();
        updateSelectedRestaurantIndex(0);
      }
      return restaurantData
    }
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
            restaurantsList.push(
            {
            key : response.data.randomRestaurants[i]._id,
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

    const getWishlist = async() =>{

        const data = {
            token : localStorage.getItem("token")
          }

        try{
            const response = await axios.post(`${config.url}/api/wishlist`, data)

            for(let i in response.data.wishlist){
                console.log(response.data.wishlist[i].name)
                restaurantsList.push(
                {
                key : response.data.wishlist[i].id,
                name : response.data.wishlist[i].name,
                rating : response.data.wishlist[i].rating,
                city : response.data.wishlist[i].location.city,
                state : response.data.wishlist[i].location.state,
                zipCode : response.data.wishlist[i].location.zip_code,
                country : response.data.wishlist[i].location.country,
                address : response.data.wishlist[i].location.address1,
                price : response.data.wishlist[i].price,
                imageURL : response.data.wishlist[i].image_url,
                restURL : response.data.wishlist[i].url,
                phone : response.data.wishlist[i].phone
                })
              }
              setRestaurantData(restaurantsList)
            } catch (error)
            {
              console.error('Error:', error);
            }
        }
    

    return (
        <>
        <div id='FindRestaurants'>
            <label>Enter restaurant type here</label>
            <input type='text' id='foodType'></input>
            <button id="findFoodBtn" onClick={findFood}>
                Find Food
            </button>
            <button id="wishlist" onClick={getWishlist}>Get Wishlist</button>
            </div>
            <div id='foodDiv'>
            <RestaurantCollaspe restaurants={checkIndex()} onIndexChange={updateSelectedRestaurantIndex}/>
        </div>
        </>
    )
}
export default FindRestaurants;