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

export type OfferType = 'apartment' | 'room' | 'house' | 'hotel';

export const getOfferTypeView = (offerType: OfferType) => offerType.charAt(0).toUpperCase() + offerType.slice(1);

export enum SortType {
  Popular = 'Popular',
  Asc = 'Price: low to high',
  Desc = 'Price: high to low',
  TopRated = 'Top rated first'
}
