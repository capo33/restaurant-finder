export interface IRestaurants {
  id?: number;
  name: string;
  location: string;
  price_range: number;
  restaurant_id: string;
  count: number;
  average_rating: number;
}

export interface IUpdateRestaurants {
  id?: number;
  name: string;
  location: string;
  price_range: number;
}
export interface IReviews {
  id?: string | number;
  name: string;
  review: string;
  rating: string;
}
