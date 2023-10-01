import {useEffect} from 'react'
import { Link, useParams } from "react-router-dom";

import { useAppSelector, useAppDispatch  } from "../redux/app/store";
import { getSingleRestaurant } from '../redux/features/restaurantSlice';
import { StarRatings } from '../components';

const RestaurantDetails = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { restaurant } = useAppSelector((state) => state.restaurants);
console.log(restaurant);

  useEffect(() => {
    dispatch(getSingleRestaurant(id as string));
  }, [dispatch, id]);


  return (
    <>
    {restaurant && (
      <>
        <h1 className='text-center display-1'>
          {restaurant?.name}
        </h1>
        <div className='text-center'>
          Average rating &nbsp;
          <StarRatings
            rating={restaurant?.average_rating}
          />
          <span className='m-1'>
            (
            {restaurant?.count
              ? restaurant?.count
              : 0}
            )
          </span>
        </div>
        <Link to='/'>Back</Link>
        <div className='mt-3'>
          {/* {!restaurant?.reviews?.length && <h1>No Reviews Yet</h1>} */}
          {/* <RestaurantReviews reviews={restaurant?.} /> */}
          {/* <AddReview /> */}
        </div>
      </>
    )}
  </>
  )
}

export default RestaurantDetails