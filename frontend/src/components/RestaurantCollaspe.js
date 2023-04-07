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
    const { restaurants } = props;
    const [selectedRestaurantIndex, setSelectedRestaurantIndex] = useState(0);

    return (
        <div>
            {restaurants.length > 0 && (
                <div>
                    <h1>Lets find your favorite restaurants</h1>
                    <CollapseComponent restaurants={restaurants[selectedRestaurantIndex]} />
                    {restaurants.length > 1 && (
                        <Button onClick={() => setSelectedRestaurantIndex((selectedRestaurantIndex + 1) % restaurants.length)}>
                            Next Restaurant
                        </Button>
                    )}
                </div>
            )}
        </div>
    )
}

export default RestaurantCollaspe;
