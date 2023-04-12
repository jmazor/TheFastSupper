import React from 'react';
import { Card, CardBody, CardTitle, CardText } from 'reactstrap';

const ReviewCard = ({ review }) => {
  return (
    <Card className="my-3">
      <CardBody>
        <CardTitle tag="h5">{`Rating: ${review.rating}`}</CardTitle>
        <CardText>{review.comment}</CardText>
        <CardText>{`Favorite: ${review.favorite ? 'Yes' : 'No'}`}</CardText>
      </CardBody>
    </Card>
  );
};

export default ReviewCard;
