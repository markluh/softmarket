export interface Software {
  id: number;
  name: string;
  description: string;
  price: number;
  rating: number;
  imageUrl: string;
  category: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  listings: number[];
}

export enum View {
  LANDING,
  BROWSE,
  SELL,
  LOGIN,
  REGISTER,
  PROFILE,
  CART,
  CHECKOUT,
}