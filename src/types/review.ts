import {Guid} from './common.ts';
import {UserDTO} from './user.ts';

export interface ReviewDTO {
  id: Guid;
  date: string;
  user: UserDTO;
  comment: string;
  rating: number;
}
