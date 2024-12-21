import {MainPage} from './Pages/Main/MainPage.tsx';
import React, {createContext, useCallback, useMemo} from 'react';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import {OfferPage} from './Pages/Offer/OfferPage.tsx';
import {SignInPage} from './Pages/SignIn/SignInPage.tsx';
import {FavoritesPage} from './Pages/Favorites/FavoritesPage.tsx';
import {City, UserDTO} from './Types/Offer/Offer.ts';
import {NotFoundPage} from './Pages/NotFound/NotFoundPage.tsx';
import {AppData} from './Mocks/mock.ts';

export interface AppProps {
  data: AppData;
  currentUser?: UserDTO;
}

export interface AuthParams {
  currentUser?: UserDTO;
  signIn: () => void;
  signOut: () => void;
}

export const AuthContext = createContext<AuthParams | undefined>(undefined);

export const App: React.FC<AppProps> = (props) => {
  const [currentUser, setCurrentUser] = React.useState<UserDTO | undefined>(props.currentUser);

  const signIn = useCallback(() => {
    setCurrentUser(props.currentUser);
  }, [props.currentUser]);

  const signOut = useCallback(() => {
    setCurrentUser(undefined);
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
          <Route path="/login" element={<SignInPage defaultCity={Object.keys(props.data.offersByCity)[0] as City}/>}/>
          <Route path="/not_found" element={<NotFoundPage defaultCity={Object.keys(props.data.offersByCity)[0] as City}/>}/>
          <Route path="/main" element={<MainPage offersByCity={props.data.offersByCity} showCount={10}/>}/>
          <Route path="/main_empty" element={<MainPage offersByCity={{}} showCount={10}/>}/>
          <Route path="/offer/:id" element={<OfferPage getOffer={(id) => props.data.offersById[id]}/>}/>
          <Route path="/favourites" element={<FavoritesPage favourites={authParams.currentUser?.favourites ?? {}}/>}/>
          <Route path="/favourites_empty" element={<FavoritesPage favourites={{}}/>}/>
          <Route path="*" element={<Navigate to="/not_found"/>}/>
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
};
