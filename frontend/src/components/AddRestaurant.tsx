import { useState } from "react";

import { useAppDispatch } from "../redux/app/store";
import { IUpdateORADDRestaurants } from "../interfaces/restaurantsInterface";
import { addRestaurant } from "../redux/features/restaurantSlice";

const AddRestaurant = () => {
  const [data, setData] = useState<IUpdateORADDRestaurants>({
    name: "",
    location: "",
    price_range: 0,
  });

  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(addRestaurant(data));
    console.log(data);
  };
  return (
    <div className='mb-4'>
      <form onSubmit={handleSubmit}>
        <div className='input-group'>
          <div className='col-4 m-2'>
            <input
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              type='text'
              className='form-control'
              placeholder='name'
            />
          </div>
          <div className='col-4 m-2'>
            <input
              value={data.location}
              onChange={(e) => setData({ ...data, location: e.target.value })}
              type='text'
              className='form-control'
              placeholder='location'
              size={10}
            />
          </div>
          <div className='col-32 m-2'>
            <select
              className='form-select mr-sm-2'
              value={data.price_range}
              onChange={(e) =>
                setData({ ...data, price_range: parseInt(e.target.value) })
              }
            >
              <option>Price Range</option>
              <option value='1'>$</option>
              <option value='2'>$$</option>
              <option value='3'>$$$</option>
              <option value='4'>$$$$</option>
              <option value='5'>$$$$$</option>
            </select>
          </div>
          <div className='col m-2'>
            <button className='btn btn-primary '>Add</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddRestaurant;
