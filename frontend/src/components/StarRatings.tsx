type StarRatingProps = {
  rating: number;
};
const StarRating = ({ rating }: StarRatingProps) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      // we use key because we are using map
      stars.push(<i key={i} className='fas fa-star'></i>);
    } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
      // if the rating is not an integer and the current star is the next star to be filled (i.e. the rating is 4.5 and we are on the 5th star) then we want to fill it with a half star icon instead of a full star icon (i.e. 4.5 stars)
      stars.push(<i key={i} className='fas fa-star-half-alt'></i>);
    } else {
      stars.push(<i key={i} className='far fa-star'></i>);
    }
  }

  return <>{stars}</>;
};

export default StarRating;
