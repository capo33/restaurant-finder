import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import App from "../App";
import { Home, UpdataRestaurant, RestaurantDetails } from "../pages";

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='' element={<Home />} />
      <Route path='restaurants/:id' element={<RestaurantDetails />} />
      <Route path='/restaurants/:id/update' element={<UpdataRestaurant />} />
    </Route>
  )
);

export default routes;
