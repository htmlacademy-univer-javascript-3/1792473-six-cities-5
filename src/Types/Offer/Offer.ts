import {Guid} from '../Common.ts';

export interface ReviewDTO {
  id: Guid;
  date: string;
  user: UserDTO;
  comment: string;
  rating: number;
}

export interface UserDTO {
  name: string;
  avatarUrl: string;
  isPro: boolean;
  email?: string;
}

export interface OfferDTO {
  id: Guid;
  title: string;
  type: OfferType;
  price: number;
  city: City;
  location: Location;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  description?: string;
  bedrooms?: number;
  previewImage?: string;
  goods?: string[];
  host?: UserDTO;
  images?: string[];
  maxAdults?: number;
}

export interface Cords {
  x: number;
  y: number;
}

export interface Location {
  latitude: number;
  longitude: number;
  zoom: number;
}

export interface City {
  name: string;
  location: Location;
}

export type OfferType = 'apartment' | 'room' | 'unknown';

export type SortType = 'Popular' | 'Price: low to high' | 'Price: high to low' | 'Top rated first';
