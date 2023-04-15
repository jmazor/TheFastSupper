import React, { useState } from 'react';
import '../App.css';
import '../custom.css';
import '../loggedin.css';
import config from '../config';
import CollapseComponent from './CollaspeComponent';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
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
import { useSpring, animated } from 'react-spring';

function RestaurantCollaspe(props) {
    const [selectedRestaurantIndex, setSelectedRestaurantIndex] = useState(0);
    const { restaurants, onIndexChange } = props;
    const[wishlist, setWishlist] = useState('')
    const[visible, setVisible] = useState(false)
    const [swipeDirection, setSwipeDirection] = useState(null);

    const handleIndexChange = (index) => {
        setSelectedRestaurantIndex(index);
        onIndexChange(index); // Call the callback function with the new index value
        setSwipeDirection(null);
      };

      const swipeProps = useSpring({
        transform: swipeDirection === 'right' ? 'translate3d(150%, 0, 0) rotate(30deg)' : swipeDirection === 'left' ? 'translate3d(-150%, 0, 0) rotate(-30deg)' : 'translate3d(0%, 0, 0) rotate(0deg)',
        opacity: swipeDirection ? 0 : 1,
        config: {
          tension: 280,
          friction: 50,
          duration: 350
        },
        onRest: () => {
            setSwipeDirection(null);
          }
      });

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
        <div className='restaurant'>
            {restaurants.length > 0 && (
                <div>
                    {/* <h1>Lets find your favorite restaurants</h1> */}
                    <animated.div style={swipeProps}>
                    <CollapseComponent className='swipe' restaurants={restaurants[selectedRestaurantIndex]} />
                    </animated.div>
                    {restaurants.length > 1 && (
                        <div id="ldButtons">
                        <Button color="red" type="primary" id="dislikeButton" className="btn btn-primary btn-lg mr-auto" onClick={() => {
                            if (selectedRestaurantIndex < restaurants.length - 1) 
                            {
                                handleIndexChange(selectedRestaurantIndex + 1);
                            }
                            else
                            {
                                handleIndexChange(restaurants.length - 1);
                            }
                            setSwipeDirection('left');
                        }
                        }>
                            Dislike
                        </Button>
                        <Button color="green" type="primary" id="likeButton" className="btn btn-primary btn-lg ml-auto" onClick={() => {
                            if (selectedRestaurantIndex < restaurants.length - 1) 
                            {
                                handleIndexChange(selectedRestaurantIndex + 1);
                            }
                            else
                            {
                                handleIndexChange(restaurants.length - 1);
                            }
                            setSwipeDirection('right');
                            addToWishlist(restaurants[selectedRestaurantIndex].key);
                        }
                        }>
                            Like
                        </Button>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default RestaurantCollaspe;
