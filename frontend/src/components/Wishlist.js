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
    Card
  } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
const Wishlist = (props) => 
{
    let restaurantsList = []
    const [restaurantData, setRestaurantData] = useState([])

    const [isOpenList, setIsOpenList] = useState([]);
    const toggle = (index) => {
        const newIsOpenList = [...isOpenList];
        newIsOpenList[index] = !newIsOpenList[index];
        setIsOpenList(newIsOpenList);
      };

    useEffect(() => {
        const fetchData = async () => {
            await getWishlist(); // await the function call
            // set restaurantData to the fetched data
            setRestaurantData(restaurantsList);
            setIsOpenList(new Array(restaurantsList.length).fill(false));
        }
        fetchData();
      }, []);

    const getWishlist = async() =>
    {
        const data = {
            token : localStorage.getItem("token")
        }

        try
        {
            const response = await axios.post(`${config.url}/api/wishlist`, data)

            for(let i in response.data.wishlist)
            {
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
            } 
        catch (error)
        {
            console.error('Error:', error);
        }
    }

    return (
        <div className='wishlist'>
            <h1 id='wishTitle'>Liked Restaurants</h1>
            {restaurantData.map((restaurant, index) => (
                <div key={restaurant.key}>
                <h1 id='name'>{restaurant.name}</h1>
                
                <Collapse isOpen={isOpenList[index]} >
                    <Card id='wishCard'>
                        <CardBody>
                            <div className='restaurantInfo'>
                                <img src={restaurant.imageURL} className="restaurantImg"/>
                                <br />
                                cost: {restaurant.price} <br/>
                                Address: {restaurant.address}, {restaurant.city}, {restaurant.state} {restaurant.zipCode}<br />
                                Rating: {restaurant.rating} Stars<br />
                                phone : {restaurant.phone} <br /> 
                            </div>
                        </CardBody>
                    </Card>
                </Collapse>
                <Button className='showMoreButton' color="primary" onClick={() => toggle(index)} style={{ marginBottom: '0.5rem', marginLeft: '1rem', marginTop: '0.5rem' }}>
                    {isOpenList[index] ? 'Hide' : 'Show More'} {/*change button text based on state*/}
                </Button>
        </div>
    ))}
  </div>
    )
}

export default Wishlist;