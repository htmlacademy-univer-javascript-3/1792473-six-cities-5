import {Guid} from '../types';
import {AppRoute} from './constants.ts';

export const getSearchParamsString = (params: {[key: string]: string}) => `?${Object.keys(params).map((key) => `${key}=${encodeURIComponent(params[key])}`).join('&')}`;
export const getPathWithSearchParams = (path: string, params: {[key: string]: string}) => `${path}${getSearchParamsString(params)}`;
export const getOfferPath = (id: Guid) => AppRoute.Offer.replace(':id', id);
export const getCityPath = (city: string) => getPathWithSearchParams(AppRoute.Main, { city: city });
export const getLoginPath = (backUrl?: string) => getPathWithSearchParams(AppRoute.Login, backUrl ? {backUrl: backUrl} : {});
