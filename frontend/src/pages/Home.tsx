import { AddRestaurant, RestaurantList } from "../components";

const Home = () => {
  return (
    <div className='container'>
      <h1 className='font-weight-light text-center display-1 mt-5'>
        Restaurant Finder
      </h1>
      <AddRestaurant />
      <RestaurantList />
    </div>
  );
};

export default Home;
