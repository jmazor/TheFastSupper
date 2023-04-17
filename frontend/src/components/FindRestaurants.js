import React, { useState, useEffect } from 'react';
import '../App.css';
import '../custom.css';
import config from '../config';
import RestaurantCollaspe from './RestaurantCollaspe';
import Wishlist from './Wishlist';
import Visitlist from './Visitlist';
import { Navigate, useNavigate } from "react-router-dom";
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
    const [listState, setListState] = useState("wish");
    const [wishState, setWishState] = useState(true);
    const [visitState, setVisitState] = useState(true);
    const [resultState, setResultState] = useState("hidden");
    const navigate = useNavigate()
    let restaurantsList = [];
    const [restaurantData, setRestaurantData] = useState([]);

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
        if (food === "The Fast Supper")
          navigate("/scrambled");

        const data = {
          token : localStorage.getItem("token"),
          category : food
        }
    
        try
        {
          let response = await axios.post(`${config.url}/api/restaurants`, data);
          if (response.data.randomRestaurants.length == 1)
          {
            response = await axios.post(`${config.url}/api/restaurants`, {token : localStorage.getItem("token"), category : ""});
          }
          else if (response.data.randomRestaurants.length == 0)
          {
            setResultState("visible");
            document.getElementById("findResult").innerHTML = `No results found for category "${food}"`;
          }
          else
          {
            setResultState("hidden");
          }
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
            phone : response.data.randomRestaurants[i].phone,
            tag: response.data.randomRestaurants[i].categories[0].title,
            })
          }
          setRestaurantData(restaurantsList)
        } catch (error)
        {
          console.error('Error:', error);
          if(error.response.status == 401){
            navigate('/login')
          }
        }
      }

    

    return (
      <div>
        <div className="restaurantDiv">
          <div className="findFood">
            <input type='text' id='foodType'></input>
            
            <Button id="findFoodBtn" color='primary' onClick={findFood}>
                Search
            </Button>
          </div>
          <RestaurantCollaspe restaurants={checkIndex()} onIndexChange={updateSelectedRestaurantIndex} setWishState={setWishState} wishState={wishState}/>
          <header id="findResult" style={{visibility:resultState}}></header>
        </div>
        <div className='wishTab'>
          <Button color={(listState=="wish") ? "primary" : "secondary"} onClick={() => {setListState("wish")}}>Wishlist</Button>
          <Button color={(listState=="visit") ? "primary" : "secondary"} onClick={() => {setListState("visit")}}>Visited</Button>
        </div>
        {listState === "visit" ? <Visitlist state={visitState} setVisitState={setVisitState}/> : <Wishlist setWishState={setWishState} state={wishState} setVisitState={setVisitState} visitState={visitState}/>}

      </div>
    )
}
export default FindRestaurants;