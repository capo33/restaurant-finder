import {useEffect} from "react";
import { useAppDispatch, useAppSelector } from "../redux/app/store";
import { getAllRestaurants } from "../redux/features/restaurantSlice";

const RestaurantList = () => {
  const { restaurants } = useAppSelector((state) => state.restaurants);
console.log(restaurants);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllRestaurants());
  }, [dispatch]);
  return <div>RestaurantList</div>;
};

export default RestaurantList;
