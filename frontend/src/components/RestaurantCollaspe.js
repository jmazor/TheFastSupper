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
    const DisplayRestaurants = (props) => {
        const [isOpen, setIsOpen] = useState(false);
        const toggle = () => setIsOpen(!isOpen);
        const { restaurants } = props
       
        if (restaurants.length > 0) {
            return (
                restaurants.map((restaurant, index) => {
                    return (
                        <CollapseComponent restaurants = {restaurant} />
                    )
                })
            )
        }
        else {
            return (
                <div>
                    <h1>Lets find your favorite restaurants</h1>
                </div>
            )
        }
    }
    return (
        <div>
            {DisplayRestaurants(props)}
        </div>
    )
}
export default RestaurantCollaspe;