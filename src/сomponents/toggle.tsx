import React, {CSSProperties, useCallback} from 'react';
import {AppDispatch, RootState} from '../index.tsx';
import {useDispatch, useSelector} from 'react-redux';
import {OfferDTO} from '../types';
import {toggleFavoritesThunk} from '../store';
import {useNavigate} from 'react-router-dom';
import {getLoginPath} from '../utils';

export interface ToggleProps {
  isActive: boolean;
  onToggle: (() => void) | undefined;
  classPrefix: string;
  disabled?: boolean;
  altText?: string;
  icon?: React.ReactNode;
}

export const Toggle: React.FC<ToggleProps> = (props) => (
  <button
    className={`${props.classPrefix}-button button ${props.isActive ? `${props.classPrefix}-button--active` : ''}`}
    type="button"
    disabled={props.disabled}
    onClick={props.onToggle}
  >
    {props.icon}
    <span className="visually-hidden">{props.altText}</span>
  </button>
);

export interface BookmarkToggleProps {
  offer: OfferDTO;
  isActive: boolean;
  classPrefix: string;
  altText?: string;
  iconStyle?: CSSProperties;
}

export const BookmarkToggle: React.FC<BookmarkToggleProps> = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);
  const favoritesLoading = useSelector((state: RootState) => state.offers.loading.favoritesLoading);
  const toggleFavoriteLoading = useSelector((state: RootState) => state.offers.loading.toggleFavoriteLoading);

  const handleToggleFavorite = useCallback(() => {
    if (!user) {
      navigate(getLoginPath(window.location.pathname + window.location.search));
    } else {
      dispatch(toggleFavoritesThunk({offer: props.offer}));
    }
  }, [dispatch, navigate, props.offer, user]);

  return (
    <Toggle
      isActive={props.isActive}
      disabled={favoritesLoading || toggleFavoriteLoading}
      classPrefix={props.classPrefix}
      altText={props.altText}
      icon={
        <svg className={`${props.classPrefix}-icon`} style={props.iconStyle}>
          <use xlinkHref="#icon-bookmark"></use>
        </svg>
      }
      onToggle={handleToggleFavorite}
    />
  );
};
