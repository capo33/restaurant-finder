import { RestaurantList } from "../components";

const Home = () => {
  return (
    <div className='container'>
      <h1 className='font-weight-light text-center display-1'>
        Restaurant Finder
      </h1>
      <RestaurantList />
    </div>
  );
};

export default Home;
