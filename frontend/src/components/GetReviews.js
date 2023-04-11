import ReviewCard from './ReviewCard';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';
import '../review.css';
import config from '../config';
const GetReviews = ({ restaurant }) => {
  const [reviews, setReviews] = useState([]);
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  useEffect(() => {
    fetchReviews();
  }, [restaurant.key]);

  const fetchReviews = async () => {
    const res = await axios.get(`${config.url}/api/review/${restaurant.key}`);
    setReviews(res.data);
  };

  return (
    <>
      <Button className='getReviewsBtn' color="primary" onClick={() => {
        fetchReviews();
        toggle();
      }}>
        {`${reviews.length} reviews`}
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Reviews</ModalHeader>
        <ModalBody>
          {reviews.map((review, index) => (
            <ReviewCard key={index} review={review} />
          ))}
        </ModalBody>
      </Modal>
    </>
  );
};

export default GetReviews;
