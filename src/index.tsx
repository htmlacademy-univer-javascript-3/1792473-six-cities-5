import ReactDOM from 'react-dom/client';
import {App} from './app.tsx';
import {authReducer, checkAuthThunk, fetchFavoritesThunk, fetchOffersThunk, offersReducer} from './store';
import {configureStore} from '@reduxjs/toolkit';
import {Provider} from 'react-redux';
import React from 'react';
import {createAPI} from './api.ts';

const api = createAPI();

const store = configureStore({
  reducer: {
    offers: offersReducer,
    auth: authReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
  devTools: process.env.NODE_ENV !== 'production'
});

store
  .dispatch(checkAuthThunk())
  .then((action) => {
    if (action.type === checkAuthThunk.fulfilled.type) {
      store.dispatch(fetchFavoritesThunk());
    }
  })
  .finally(() => {
    store.dispatch(fetchOffersThunk());
  });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
  </React.StrictMode>
);
