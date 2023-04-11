import ReviewCard from './ReviewCard';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';
import '../review.css';

const GetReviews = ({ restaurant }) => {
  const [reviews, setReviews] = useState([]);
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  useEffect(() => {
    const fetchReviews = async () => {
      const res = await axios.get(`/api/review/:${restaurant._id}`);
      setReviews(res.data);
    };

    fetchReviews();
  }, [restaurant._id]);

  return (
    <>
      <Button className='getReviewsBtn' color="primary" onClick={toggle}>
        {`${reviews.length} reviews`}
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Reviews</ModalHeader>
        <ModalBody>
          {reviews.map((review) => (
            <ReviewCard key={review._id} review={review} />
          ))}
        </ModalBody>
      </Modal>
    </>
  );
};

export default GetReviews;
