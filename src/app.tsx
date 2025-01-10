import React from 'react';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import {OfferPage} from './pages/offer/offer.tsx';
import {LoginPage} from './pages/login/login.tsx';
import {FavoritesPage} from './pages/favorites/favorites.tsx';
import {MainPage} from './pages/main/main.tsx';
import {NotFoundPage} from './pages/not-found/not-found.tsx';
import {AppRoute} from './utils';
import {useSelector} from 'react-redux';
import {RootState} from './index.tsx';
import {ServerErrorPage, Spinner} from './components';

export const App: React.FC = () => {
  const {isLoading, error} = useSelector((state: RootState) => state.auth);
  if (isLoading) {
    return <Spinner/>;
  }

  if (error && (error.code === 'ECONNABORTED' || error.code === 'ERR_NETWORK')) {
    return <ServerErrorPage/>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Login} element={<LoginPage/>}/>
        <Route path={AppRoute.Favorites} element={<FavoritesPage/>}/>
        <Route path={AppRoute.NotFound} element={<NotFoundPage/>}/>
        <Route path={AppRoute.Offer} element={<OfferPage/>}/>
        <Route path={AppRoute.Main} element={<MainPage/>}/>
        <Route path="*" element={<Navigate to={AppRoute.NotFound}/>}/>
      </Routes>
    </BrowserRouter>
  );
};
