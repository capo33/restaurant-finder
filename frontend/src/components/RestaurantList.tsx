import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import StarRating from "./StarRatings";
import { useAppDispatch, useAppSelector } from "../redux/app/store";
import { getAllRestaurants } from "../redux/features/restaurantSlice";
import { IRestaurants } from "../interfaces/restaurantsInterface";
import { price_rating } from "../utils";

const RestaurantList = () => {
  const { restaurants } = useAppSelector((state) => state.restaurants);
  console.log(restaurants);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllRestaurants());
  }, [dispatch]);

  // Render Rating component
  const renderRating = (restaurant: IRestaurants) => {
    if (!restaurant.count) {
      return <span className='text-warning'>0 reviews</span>;
    }
    return (
      <>
        <StarRating rating={restaurant?.id} />
        <span className='text-muted ms-1'>({restaurant.count})</span>
      </>
    );
  };

  // update restaurant
  const handleUpdateRestaurant = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    navigate(`/restaurants/${id}/update`);
  };

  // select restaurant
  const handleSelectRestaurant = (id: number) => {
    navigate(`/restaurants/${id}`);
  };

    // delete restaurant
  // const handleDelete = ( id: number) => {
  // }

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
                    <button
                      onClick={() => handleSelectRestaurant(restaurant?.id)}
                      className='btn btn-info btn-sm'
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={(e) => handleUpdateRestaurant(e, restaurant.id)}
                      className='btn btn-warning btn-sm'
                    >
                      Update
                    </button>
                  </td>

                  <td>
                    {restaurant?.count > 0 ? (
                      <div title='restaurant with reviews cannot be deleted'>
                        <button
                          // onClick={(e) => {
                          //   handleDelete(e, restaurant.id);
                          // }}
                          className='btn btn-danger btn-sm'
                          disabled
                        >
                          Delete
                        </button>
                      </div>
                    ) : (
                      <button
                        // onClick={(e) => {
                        //   handleDelete(e, restaurant.id);
                        // }}
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
