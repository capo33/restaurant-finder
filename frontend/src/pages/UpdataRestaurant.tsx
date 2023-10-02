import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import { IUpdateRestaurants } from "../interfaces/restaurantsInterface";
import { useAppSelector, useAppDispatch } from "../redux/app/store";
import {
  getSingleRestaurant,
  updateRestaurant,
} from "../redux/features/restaurantSlice";

export const UpdataRestaurant = () => {
  const { id } = useParams<{ id: string }>();
  const { restaurant } = useAppSelector((state) => state.restaurants);

  const [data, setData] = useState<IUpdateRestaurants>({
    name: "",
    location: "",
    price_range: 0,
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getSingleRestaurant(id as string));
    setData({
      name: restaurant?.restaurant?.name as string,
      location: restaurant?.restaurant?.location as string,
      price_range: restaurant?.restaurant?.price_range as number,
    });
  }, [
    dispatch,
    id,
    restaurant?.restaurant?.name,
    restaurant?.restaurant?.location,
    restaurant?.restaurant?.price_range,
  ]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      updateRestaurant({
        id: id as string,
        data,
      })
    );
    navigate("/");
  };
  return (
    <div className='container'>
      <h1 className='text-center display-1'>Update Restaurant</h1>
      <Link to='/'>Back</Link>
      <div className='mt-3'>
        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <label htmlFor='name'>Name</label>
            <input
              id='name'
              className='form-control'
              type='text'
              value={data.name as string}
              onChange={(e) => setData({ ...data, name: e.target.value })}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='location'>Location</label>
            <input
              id='location'
              className='form-control'
              type='text'
              value={data.location as string}
              onChange={(e) => setData({ ...data, location: e.target.value })}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='price_range'>Price Range</label>
            <select
              className='form-select   '
              value={data.price_range as number}
              onChange={(e) =>
                setData({ ...data, price_range: parseInt(e.target.value) })
              }
            >
              <option disabled>Price Range</option>
              <option value='1'>$</option>
              <option value='2'>$$</option>
              <option value='3'>$$$</option>
              <option value='4'>$$$$</option>
              <option value='5'>$$$$$</option>
            </select>
          </div>
          <button
            // onClick={handleSubmit}
            className='btn btn-primary mt-3'
            type='submit'
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
