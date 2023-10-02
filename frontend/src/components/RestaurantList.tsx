import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import StarRating from "./StarRatings";
import { useAppDispatch, useAppSelector } from "../redux/app/store";
import {
  deleteRestaurant,
  getAllRestaurants,
} from "../redux/features/restaurantSlice";
import { IRestaurants } from "../interfaces/restaurantsInterface";
import { price_rating } from "../utils";

const RestaurantList = () => {
  const { restaurants } = useAppSelector((state) => state.restaurants);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllRestaurants());
  }, [dispatch]);

  // Render Rating component
  const renderRating = (restaurant: IRestaurants) => {
    if (!restaurant?.count) {
      return <span className='text-warning'>0 reviews</span>;
    }
    return (
      <>
        <StarRating rating={restaurant?.average_rating} />
        <span className='text-muted ms-1'>({restaurant?.count})</span>
      </>
    );
  };

  // delete restaurant
  const handleDelete = (id: string) => {
    dispatch(deleteRestaurant(id));
    navigate("/");
  };

  return (
    <div className='list-group'>
      <table className='table table-hover text-center'>
        <thead>
          <tr className='bg-dark text-white'>
            <th>Restaurant</th>
            <th>Location</th>
            <th>Price Range</th>
            <th>Rating</th>
            <th>Edit</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {restaurants &&
            restaurants?.map((restaurant) => {
              return (
                <tr key={restaurant?.id}>
                  <td>{restaurant?.name}</td>
                  <td>{restaurant?.location}</td>
                  <td> {price_rating(restaurant?.price_range)}</td>
                  <td>{renderRating(restaurant)}</td>
                  <td>
                    <Link
                      to={`/restaurants/${restaurant?.id}`}
                      className='btn btn-info btn-sm'
                    >
                      Edit
                    </Link>
                  </td>
                  <td>
                    <Link
                      to={`/restaurants/${restaurant?.id}/update`}
                      className='btn btn-warning btn-sm'
                    >
                      Update
                    </Link>
                  </td>

                  <td>
                    {restaurant?.count > 0 ? (
                      <div title='restaurant with reviews cannot be deleted'>
                        <button
                          onClick={() => handleDelete(restaurant?.id as string)}
                          className='btn btn-danger btn-sm'
                          disabled
                        >
                          Delete
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleDelete(restaurant?.id as string)}
                        className='btn btn-danger btn-sm'
                      >
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default RestaurantList;
