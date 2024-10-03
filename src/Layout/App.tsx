import {MainPage} from '../Pages/Main/MainPage.tsx';
import React from 'react';
import {AppData} from '../index.tsx';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import {Header} from './Header.tsx';
import {OfferPage} from '../Pages/Offer/OfferPage.tsx';

export interface AppProps {
  data: AppData;
}

export const App: React.FC<AppProps> = (props) => {
  const [data, setData] = React.useState<AppData>({...props.data});
  const signIn = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.preventDefault();
    setData(props.data);
  };

  const signOut = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.preventDefault();
    const dataCopy: AppData = {...data};
    dataCopy.currentUser = null;
    setData(dataCopy);
  };

  return (
    <div className="page page--gray page--main">
      <Header currentUser={data.currentUser} signIn={signIn} signOut={signOut}/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/MainPage"/>}/>
          <Route path="/MainPage" element={<MainPage offers={data.offers} showCount={10}/>}/>
          <Route path="/MainEmpty" element={<MainPage offers={[]} showCount={10}/>}/>
          <Route path="/OfferPage" element={<OfferPage user={data.currentUser} offer={data.offers[0]}/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
};