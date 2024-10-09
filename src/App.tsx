import {MainPage} from './Pages/Main/MainPage.tsx';
import React, {createContext, useCallback, useMemo} from 'react';
import {AppData} from './index.tsx';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import {OfferPage} from './Pages/Offer/OfferPage.tsx';
import {SignInPage} from './Pages/SignIn/SignInPage.tsx';
import {FavouritesPage} from './Pages/Favourites/FavouritesPage.tsx';
import {Nullable} from 'vitest';
import {UserDTO} from './Types/Offer/Offer.ts';
import {NotFoundPage} from './Pages/NotFound/NotFoundPage.tsx';

export interface AppProps {
  data: AppData;
  currentUser: Nullable<UserDTO>;
}

export interface AuthParams {
  currentUser: Nullable<UserDTO>;
  signIn: () => void;
  signOut: () => void;
}

export const AuthContext = createContext<Nullable<AuthParams>>(null);

export const App: React.FC<AppProps> = (props) => {
  const [currentUser, setCurrentUser] = React.useState<Nullable<UserDTO>>(props.currentUser);

  const signIn = useCallback(() => {
    setCurrentUser(props.currentUser);
  }, [props.currentUser]);

  const signOut = useCallback(() => {
    setCurrentUser(null);
  }, []);

  const authParams: AuthParams = useMemo(() => ({
    currentUser: currentUser,
    signIn: signIn,
    signOut: signOut
  }), [currentUser, signIn, signOut]);

  return (
    <AuthContext.Provider value={authParams}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/main"/>}/>
          <Route path="/login" element={<SignInPage/>}/>
          <Route path="/not_found" element={<NotFoundPage/>}/>
          <Route path="/main" element={<MainPage offers={Object.values(props.data.offers)} showCount={10}/>}/>
          <Route path="/main_empty" element={<MainPage offers={[]} showCount={10}/>}/>
          <Route path="/offer/:id" element={<OfferPage getOffer={(id) => props.data.offers[id]}/>}/>
          <Route path="/favourites" element={<FavouritesPage favourites={props.data.favourites}/>}/>
          <Route path="/favourites_empty" element={<FavouritesPage favourites={{}}/>}/>
          <Route path="*" element={<Navigate to="/not_found"/>}/>
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
};
