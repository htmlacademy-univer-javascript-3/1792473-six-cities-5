import {Guid} from '../Common.ts';
import {Nullable} from 'vitest';
import {City} from '../../Mocks/offers.ts';

export type HostLevel = 'Pro' | 'Unknown';

export class ReviewDTO {
  id: Guid = '';
  user: Nullable<UserDTO> = null;
  text: string = '';
  rating: number = 0;
  date: Date = new Date();
}

export class UserDTO {
  name: string = '';
  email: string = '';
  avatarImagePath: string = '';
  level: HostLevel = 'Unknown';
  favourites: Partial<Record<City, OfferDTO[]>> = {};
}

export class OfferDetailsDTO {
  bedroomsCount: number = 0;
  maxAdultsCount: number = 0;
  insides: string[] = [];
  host: Nullable<UserDTO> = null;
  allImagePaths: string[] = [];
}

export class OfferDTO {
  id: Guid = '';
  city: City = 'Amsterdam';
  cost: number = 0;
  shortDescription: string = '';
  description: string[] = [];
  imagePath: string = '';
  isPremium?: boolean = false;
  rating: number = 0;
  type: OfferType = 'Unknown';
  details: Nullable<OfferDetailsDTO> = null;
  reviews: ReviewDTO[] = [];
  getNeighbours: () => OfferDTO[] = () => [];
}

export type OfferType = 'Apartment' | 'Room' | 'Unknown'
