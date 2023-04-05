import React, { useState } from 'react';
import '../App.css';
import '../custom.css';
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

const CollapseComponent = (props) =>{
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const { restaurants } = props

    return (
        <div>
            {restaurants.name}
            <Button color="primary" onClick={toggle} style={{ marginBottom: '0.5rem', marginLeft: '1rem', marginTop: '0.5rem' }}>
                Show More
            </Button>
            <Collapse isOpen={isOpen} >
                <Card>
                    <CardBody>
                        <div class='restaurantInfo'>
                        cost: {restaurants.price} <br/>
                        Address: {restaurants.address}, {restaurants.city}, {restaurants.state} {restaurants.zipCode}<br />
                        Rating: {restaurants.rating} Stars<br />
                        phone : {restaurants.phone} <br />
                        link :  <a href={restaurants.restURL}>Visit Us</a> <br />
                        </div>
                        <img src={restaurants.imageURL} class="restaurantImg"/>
                    </CardBody>
                </Card>
            </Collapse>
        </div >
    )

}
export default CollapseComponent