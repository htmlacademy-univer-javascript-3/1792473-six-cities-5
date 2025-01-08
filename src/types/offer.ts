import {Guid} from './common.ts';
import {UserDTO} from './user.ts';
import {City} from './city.ts';
import {Location} from './location.ts';

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

export type OfferType = 'apartment' | 'room' | 'unknown';

export type SortType = 'Popular' | 'Price: low to high' | 'Price: high to low' | 'Top rated first';
