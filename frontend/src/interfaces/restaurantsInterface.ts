export interface IRestaurants {
  
    id: number;
    name: string;
    location: string;
    price_range: number;
    restaurant_id: string;
    count: number;
    average_rating: number;
  
  reviews: IReviews[];
}

export interface IReviews {
  id?: string;
  name: string;
  review: string;
  rating: string;
}
