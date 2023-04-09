import React, { useState } from 'react';
import '../App.css';
import '../custom.css';
import CollapseComponent from './CollaspeComponent';
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

function RestaurantCollaspe(props) {
    const [selectedRestaurantIndex, setSelectedRestaurantIndex] = useState(0);
    const { restaurants, onIndexChange } = props;
    
    const handleIndexChange = (index) => {
        setSelectedRestaurantIndex(index);
        onIndexChange(index); // Call the callback function with the new index value
      };

    return (
        <div className='restaurant'>
            {restaurants.length > 0 && (
                <div>
                    {/* <h1>Lets find your favorite restaurants</h1> */}
                    <CollapseComponent className='swipe' restaurants={restaurants[selectedRestaurantIndex]} />
                    {restaurants.length > 1 && (
                        <Button onClick={() => {
                            if (selectedRestaurantIndex < restaurants.length - 1) 
                            {
                                handleIndexChange(selectedRestaurantIndex + 1);
                            }
                            else
                            {
                                handleIndexChange(restaurants.length - 1);
                            }
                        }
                        }>
                            Next Restaurant
                        </Button>
                    )}
                </div>
            )}
        </div>
    )
}

export default RestaurantCollaspe;
