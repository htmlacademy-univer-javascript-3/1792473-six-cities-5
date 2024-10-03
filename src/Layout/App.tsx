import {MainPage} from '../Pages/Main/MainPage.tsx';
import React from 'react';
import {AppData} from '../index.tsx';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import {Header} from './Header.tsx';
import {OfferPage} from "../Pages/Offer/OfferPage.tsx";

export interface AppProps {
  data: AppData;
}

export const App: React.FC<AppProps> = ({data}) =>
  (
    <div className="page page--gray page--main">
      <Header/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/MainPage"/>}/>
          <Route path="/MainPage" element={<MainPage offers={data.offers} showCount={10}/>}/>
          <Route path="/MainEmpty" element={<MainPage offers={[]} showCount={10}/>}/>
          <Route path="/OfferPage" element={<OfferPage offer={data.offers[0]}/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
