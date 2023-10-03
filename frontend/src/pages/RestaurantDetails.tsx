import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { IoArrowBackCircleSharp } from "react-icons/io5";

import { useAppSelector, useAppDispatch } from "../redux/app/store";
import { getSingleRestaurant } from "../redux/features/restaurantSlice";
import { AddReview, StarRatings, RestaurantReviews } from "../components";

const RestaurantDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { restaurant } = useAppSelector((state) => state.restaurants);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getSingleRestaurant(id as string));
  }, [dispatch, id]);

  return (
    <div className='container'>
      {restaurant && (
        <>
          <h1 className='text-center display-1 mt-5'>
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
          <Link to='/'>
            <IoArrowBackCircleSharp size={30} />
          </Link>
          <div className='mt-3'>
            {restaurant?.reviews?.length === 0 && (
              <div className='alert alert-warning text-center'>
                No reviews, be the first to review!
              </div>
            )}

            <RestaurantReviews reviews={restaurant?.reviews} />
            <AddReview id={id} />
          </div>
        </>
      )}
    </div>
  );
};

export default RestaurantDetails;
