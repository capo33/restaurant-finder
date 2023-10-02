import { IReviews } from "../interfaces/restaurantsInterface";
import { useAppDispatch } from "../redux/app/store";
import { deleteReview } from "../redux/features/restaurantSlice";
import { StarRatings } from "../components";

interface IRestaurantReviewsProps {
  reviews: IReviews[];
}

const RestaurantReviews = ({ reviews }: IRestaurantReviewsProps) => {
  const dispatch = useAppDispatch();

  // delete review
  const handleDelete = (id: string) => {
    dispatch(deleteReview(id as string));
  };

  return (
    <div className='row row-cols-3 mb-2'>
      {reviews?.map((review) => {
        return (
          <div
            key={review?.id}
            className='card text-dark bg-info my-3 me-4'
            style={{ maxWidth: "30%" }}
          >
            <div className='card-header d-flex justify-content-between align-items-center '>
              <span>{review?.name ? review?.name : "Anonymous"}</span>
              <button
                onClick={() => handleDelete(review?.id as string)}
                className='btn'
              >
                <i className='far fa-trash-alt'></i>
              </button>
            </div>
            <div className='card-body'>
              <span>
                <StarRatings rating={parseInt(review?.rating)} />
              </span>
              <p className='card-text mt-3'>{review?.review}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RestaurantReviews;
