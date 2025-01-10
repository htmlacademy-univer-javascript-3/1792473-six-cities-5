import {SortType} from '../types';

export const ALL_CITY_NAMES: string[] = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];
export const DEFAULT_CITY: string = 'Paris';
export const DEFAULT_SORT_TYPE: SortType = SortType.Popular;
export const AppRoute = {
  Login: '/login',
  Offer: '/offer/:id',
  Favorites: '/favorites',
  NotFound: '/not_found',
  Main: '/',
} as const;
