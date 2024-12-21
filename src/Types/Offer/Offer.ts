import {Guid} from '../Common.ts';
import {Nullable} from 'vitest';
export type HostLevel = 'Pro' | 'Unknown';

export interface ReviewDTO {
  id: Guid;
  user: Nullable<UserDTO>;
  text: string;
  rating: number;
  date: Date;
}

export interface UserDTO {
  name: string;
  email: string;
  avatarImagePath: string;
  level: HostLevel;
  favourites: Partial<Record<City, OfferDTO[]>>;
}

export interface OfferDetailsDTO {
  bedroomsCount: number;
  maxAdultsCount: number;
  insides: string[];
  host: UserDTO;
  allImagePaths: string[];
}

export interface OfferDTO {
  id: Guid;
  city: City;
  cost: number;
  shortDescription: string;
  description: string[];
  imagePath: string;
  isPremium?: boolean;
  rating: number;
  type: OfferType;
  details?: OfferDetailsDTO;
  reviews: ReviewDTO[];
  cords?: Cords;
  getNeighbours: () => OfferDTO[];
}

export interface Cords {
  x: number;
  y: number;
}

export type City = 'Paris' | 'Cologne' | 'Brussels' | 'Amsterdam' | 'Hamburg' | 'Dusseldorf';

export type OfferType = 'Apartment' | 'Room' | 'Unknown'
