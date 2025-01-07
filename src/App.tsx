import React from 'react';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import {OfferPage} from './Pages/Offer/OfferPage.tsx';
import {LoginPage} from './Pages/Login/LoginPage.tsx';
import {FavoritesPage} from './Pages/Favorites/FavoritesPage.tsx';
import {UserDTO} from './Types/Offer/Offer.ts';
import {MainPage} from './Pages/Main/MainPage.tsx';
import {NotFoundPage} from './Pages/NotFound/NotFoundPage.tsx';

export interface AppProps {
  currentUser?: UserDTO;
}

export interface AuthParams {
  currentUser?: UserDTO;
  signIn: () => void;
  signOut: () => void;
}

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

