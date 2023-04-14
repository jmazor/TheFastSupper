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
    Card,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
  } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const AddReview = ({restaurantID, ...args}) =>{
    const navigate = useNavigate()
    const [userReviewModal, setUserReviewModal] = useState(false);
    const toggleUserReview = () => {setUserReviewModal(!userReviewModal)};
    const [restID, setRestID] = useState(restaurantID)
    const [starRating, setStarRating] = useState(1)
    const [checked, setChecked] = useState(false);
    const handleChange = () =>  setChecked(!checked)
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggleDropdown = () => setDropdownOpen((prevState) => !prevState); 

    const submitReview = async(e) =>{
        e.preventDefault()
        const data = {
            token : localStorage.getItem("token"),
            restaurantID : restID,
            rating : starRating,
            review : e.target.reviewField.value,
            favorite : checked
        }
        
        try{
            const response = await axios.post(`${config.url}/api/review`, data)
            toggleUserReview(data.restaurantID)
            console.log("Review successfully submitted")
            console.log(data.restaurantID)
        }catch(error)
        {
            console.log(error)
            if(error.response.status == 401){
                navigate('/login')
              }
        }

    }

    return(
        <>
        <Button color='primary' size='sm' onClick={() =>toggleUserReview(restaurantID)}>Rate/Review</Button>
        <Modal isOpen={userReviewModal} toggle={toggleUserReview}>
          <Form onSubmit={submitReview}>
            <ModalHeader toggle={toggleUserReview}>Leave a Review</ModalHeader>
            <ModalBody>
              <FormGroup>
                <Label for="userRating">Rating</Label>
                <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown} id='userRating'>
                <DropdownToggle caret>{starRating} stars</DropdownToggle>
                    <DropdownMenu {...args}>
                        <DropdownItem onClick={() => setStarRating(1)}>1</DropdownItem>
                        <DropdownItem onClick={() => setStarRating(2)}>2</DropdownItem>
                        <DropdownItem onClick={() => setStarRating(3)}>3</DropdownItem>
                        <DropdownItem onClick={() => setStarRating(4)}>4</DropdownItem>
                        <DropdownItem onClick={() => setStarRating(5)}>5</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
              </FormGroup>
              <FormGroup>
                <Label for="reviewField">Tell us what you think</Label>
                <Input type='textarea' id='reviewField'></Input>
                <Input type="checkbox" checked={checked} onChange={handleChange}/>
                <Label check id="favorite">Favorite</Label>
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" type="submit">
                Submit Review
              </Button>
              <Button color="secondary" onClick={toggleUserReview}>
                Cancel
              </Button>
            </ModalFooter>
          </Form>
        </Modal>
        </>
    )
}
export default AddReview;