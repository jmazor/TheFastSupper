import React, { useState } from 'react';
import '../App.css';
import '../custom.css';
import CollapseComponent from './CollaspeComponent';
import FindRestaurants from './FindRestaurants';
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
    const { restaurants } = props;
    const [selectedRestaurantIndex, setSelectedRestaurantIndex] = useState(0);

    const fetchMoreRestaurants = async () => {
        const newRestaurants = await findFood();
        if (newRestaurants.length > 0) {
            setSelectedRestaurantIndex(0);
            setRestaurants(newRestaurants);
        }
    };
    return (
        <div>
            {restaurants.length > 0 && (
                <div>
                    <h1>Lets find your favorite restaurants</h1>
                    <CollapseComponent restaurants={restaurants[selectedRestaurantIndex]} />
                    {restaurants.length > 1 && (
                        <Button onClick={() => {
                            if (selectedRestaurantIndex != restaurants.length) 
                            {
                                setSelectedRestaurantIndex(selectedRestaurantIndex + 1);
                            }
                            else
                            {
                                fetchMoreRestaurants();
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
