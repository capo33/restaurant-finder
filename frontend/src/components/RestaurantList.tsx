import { useEffect } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { useNavigate, Link } from "react-router-dom";
import { AiFillStar, AiOutlineEdit } from "react-icons/ai";

import { StarRatings } from "./";
import { price_rating } from "../utils";
import {
  deleteRestaurant,
  getAllRestaurants,
} from "../redux/features/restaurantSlice";
import { IRestaurants } from "../interfaces/restaurantsInterface";
import { useAppDispatch, useAppSelector } from "../redux/app/store";

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
      return <span className='text-danger'>0 reviews</span>;
    }
    return (
      <>
        <StarRatings rating={restaurant?.average_rating} />
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
            <th>Rate</th>
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
                      className='btn btn-sm outline-none'
                    >
                      <AiFillStar size={25} color='#f6a40d' />
                    </Link>
                  </td>
                  <td>
                    <Link
                      to={`/restaurants/${restaurant?.id}/update`}
                      className='btn btn-sm outline-none'
                    >
                      <AiOutlineEdit size={25} color='#10508f' />
                    </Link>
                  </td>

                  <td>
                    {restaurant?.count > 0 ? (
                      <div title='restaurant with reviews cannot be deleted'>
                        <button className='btn btn-outline-secondary' disabled>
                          <MdDeleteOutline size={25} color='dnger' />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleDelete(restaurant?.id as string)}
                        className='btn btn-sm outline-none'
                      >
                        <MdDeleteOutline size={25} color='#f60d0d' />
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
