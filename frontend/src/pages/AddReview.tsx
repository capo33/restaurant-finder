import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAppDispatch } from "../redux/app/store";
import { IReviews } from "../interfaces/restaurantsInterface";
import { addReview } from "../redux/features/restaurantSlice";

interface IAddReviewProps {
  id: string | undefined;
}
const AddReview = ({ id }: IAddReviewProps) => {
  const [review, setReview] = useState<IReviews>({
    id: id ,
    name: "",
    rating: "",
    review: "",
  });
  console.log('revieeeeeeeeeeeew',review.id);
  console.log('idddddd',id);
  

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // submit review
  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("id", id);
    console.log("review", review.id);

    dispatch(addReview({ id: id as string, review }));
    navigate(`/restaurants/${id}`);
    setReview({
      id: id,
      name: "",
      rating: "",
      review: "",
    });
  };

  return (
    <div className='mb-2'>
      <form onSubmit={handleSubmitReview}>
        <div className='row'>
          <div className='form-group col-8'>
            <label htmlFor='name'>Name</label>
            <input
              value={review.name}
              onChange={(e) => setReview({ ...review, name: e.target.value })}
              id='name'
              placeholder='your name'
              className='form-control'
              type='text'
            />
          </div>
          <div className='form-group col-4'>
            <label htmlFor='rating'>Rating</label>
            <select
              id='rating'
              className='form-select mb-sm-3'
              value={review.rating}
              onChange={(e) => setReview({ ...review, rating: e.target.value })}
            >
              <option>Rating</option>
              <option value='1'>1</option>
              <option value='2'>2</option>
              <option value='3'>3</option>
              <option value='4'>4</option>
              <option value='5'>5</option>
            </select>
          </div>
          <div className='form-group'>
            <label htmlFor='review'>Review</label>
            <textarea
              id='review'
              value={review.review}
              onChange={(e) => setReview({ ...review, review: e.target.value })}
              className='form-control'
            ></textarea>
          </div>
          <div className='form-group'>
            <button type='submit' className='btn btn-primary my-3'>
              Add Review
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddReview;
