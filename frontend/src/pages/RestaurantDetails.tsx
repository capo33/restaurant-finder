import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "../redux/app/store";
import { getSingleRestaurant } from "../redux/features/restaurantSlice";
import { StarRatings } from "../components";
import RestaurantReviews from "./RestaurantReviews";
import AddReview from "./AddReview";

const RestaurantDetails = () => {
  const { id:something } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { restaurant } = useAppSelector((state) => state.restaurants);
   console.log('restaurant',restaurant?.restaurant?.restaurant_id);
   

  useEffect(() => {
    dispatch(getSingleRestaurant(something as string));
  }, [dispatch, something]);

  return (
    <div className='container'>
      {restaurant && (
        <>
          <h1 className='text-center display-1'>
            {restaurant?.restaurant?.name}
          </h1>
          <div className='text-center'>
            Average rating &nbsp;
            <StarRatings rating={restaurant?.restaurant?.average_rating} />
            <span className='m-1'>
              (
              {restaurant?.restaurant?.count
                ? restaurant?.restaurant?.count
                : 0}
              )
            </span>
          </div>
          <Link to='/'>Back</Link>
          <div className='mt-3'>
            {/* {reviews?.length && <h1>No Reviews Yet</h1>} */}
            <RestaurantReviews
              something={something}
              reviews={restaurant?.reviews}
            />
            <AddReview id={something} />
          </div>
        </>
      )}
    </div>
  );
};

export default RestaurantDetails;
