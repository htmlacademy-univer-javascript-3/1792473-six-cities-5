import React from 'react';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import {OfferPage} from './pages/offer/offer-page.tsx';
import {LoginPage} from './pages/login/login.tsx';
import {FavoritesPage} from './pages/favorites/favorites.tsx';
import {MainPage} from './pages/main/main.tsx';
import {NotFoundPage} from './pages/not-found/not-found.tsx';

export const App: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<LoginPage defaultCity="Amsterdam"/>}/>
      <Route path="/favorites" element={<FavoritesPage/>}/>
      <Route path="/not_found" element={<NotFoundPage defaultCity="Amsterdam"/>}/>
      <Route path="/offer/:id" element={<OfferPage/>}/>
      <Route path="/" element={<MainPage showCount={10}/>}/>
      <Route path="*" element={<Navigate to="/not_found"/>}/>
    </Routes>
  </BrowserRouter>
);

