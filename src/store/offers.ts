import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  EntityState,
  isAnyOf,
  SerializedError
} from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';
import {RootState} from '../index.tsx';
import {Guid, OfferDTO, ReviewDTO, SortType} from '../types';
import {CommentData} from '../pages/offer/comment-form.tsx';
import {DEFAULT_CITY, DEFAULT_SORT_TYPE} from '../utils';
import {checkAuthThunk, loginThunk, logoutThunk} from './auth.ts';

const offersAdapter = createEntityAdapter<OfferDTO>({
  selectId: (offer) => offer.id,
});

export interface OffersState {
  offers: EntityState<OfferDTO>;
  city: string;
  sortType: SortType;
  currentOffer: {
    offer: OfferDTO | null;
    nearPlacesIds: Guid[] | null;
    reviews: ReviewDTO[] | null;
  };
  status: {
    successfullySentReview: boolean;
  };
  loading: {
    offersLoading: boolean;
    offerLoading: boolean;
    nearPlacesLoading: boolean;
    reviewsLoading: boolean;
    favoritesLoading: boolean;
    toggleFavoriteLoading: boolean;
    sendingReviewLoading: boolean;
  };
  error: {
    offersError: SerializedError | null;
    offerError: SerializedError | null;
    favoritesError: SerializedError | null;
    toggleFavoriteError: SerializedError | null;
    sendingReviewError: SerializedError | null;
  };
}

const initialState: OffersState = {
  offers: offersAdapter.getInitialState(),
  city: DEFAULT_CITY,
  sortType: DEFAULT_SORT_TYPE,
  currentOffer: {
    offer: null,
    nearPlacesIds: null,
    reviews: null
  },
  status: {
    successfullySentReview: false,
  },
  loading: {
    offersLoading: false,
    favoritesLoading: false,
    nearPlacesLoading: false,
    offerLoading: false,
    sendingReviewLoading: false,
    toggleFavoriteLoading: false,
    reviewsLoading: false
  },
  error: {
    offersError: null,
    offerError: null,
    favoritesError: null,
    toggleFavoriteError: null,
    sendingReviewError: null
  },
};

export const selectFavorites = createSelector(
  (state: RootState) => state.offers.offers,
  (offersState) => {
    const offers = offersAdapter.getSelectors().selectAll(offersState);
    return offers.filter((offer) => offer.isFavorite);
  }
);

export const selectNearPlaces = createSelector(
  [
    (state: RootState) => state.offers.offers,
    (state: RootState) => state.offers.currentOffer.nearPlacesIds
  ],
  (offersState, nearPlacesIds) => {
    const offers = offersAdapter.getSelectors().selectEntities(offersState);
    return nearPlacesIds?.map((id) => offers[id]).filter((offer) => offer !== undefined) as OfferDTO[];
  }
);

export const selectFilteredOffers = createSelector(
  (state: RootState) => state.offers.offers,
  (state: RootState) => state.offers.city,
  (state: RootState) => state.offers.sortType,
  (offersState, city, sortType) => {
    const offers = offersAdapter.getSelectors().selectAll(offersState);

    const filtered = offers.filter((offer) => offer.city.name === city);

    switch (sortType) {
      case SortType.Asc:
        return filtered.sort((a, b) => a.price - b.price);
      case SortType.Desc:
        return filtered.sort((a, b) => b.price - a.price);
      case SortType.TopRated:
        return filtered.sort((a, b) => b.rating - a.rating);
      default:
        return filtered;
    }
  }
);

export const fetchOffersThunk = createAsyncThunk<OfferDTO[], void, { extra: AxiosInstance }>(
  'offers/fetchOffers',
  async (_, {extra: api}) => {
    const response = await api.get<OfferDTO[]>('/offers');
    return response.data;
  }
);

export const fetchOfferThunk = createAsyncThunk<OfferDTO, {id: Guid}, { extra: AxiosInstance }>(
  'offers/fetchOffer',
  async ({id}, {extra: api}) => {
    const response = await api.get<OfferDTO>(`/offers/${id}`);
    return response.data;
  }
);

export const fetchNearbyOffersThunk = createAsyncThunk<OfferDTO[], {id: Guid}, { extra: AxiosInstance }>(
  'offers/fetchNearbyOffers',
  async ({id}, {extra: api}) => {
    const response = await api.get<OfferDTO[]>(`/offers/${id}/nearby`);
    return response.data;
  }
);

export const fetchReviewsThunk = createAsyncThunk<ReviewDTO[], {id: Guid}, { extra: AxiosInstance }>(
  'offers/fetchReviewsThunk',
  async ({id}, {extra: api}) => {
    const response = await api.get<ReviewDTO[]>(`/comments/${id}`);
    return response.data;
  }
);

export const addReviewThunk = createAsyncThunk<ReviewDTO, {id: Guid; data: CommentData}, { extra: AxiosInstance }>(
  'offers/addReviewThunk',
  async ({id, data}, {extra: api}) => {
    const response = await api.post<ReviewDTO>(`/comments/${id}`, data);
    return response.data;
  }
);

export const fetchFavoritesThunk = createAsyncThunk<OfferDTO[], void, { extra: AxiosInstance }>(
  'offers/fetchFavorites',
  async (_, {extra: api}) => {
    const response = await api.get<OfferDTO[]>('/favorite');
    const favorites = response.data;

    return favorites.map((offer) => ({
      ...offer,
      isFavorite: true,
    }));
  }
);

export const toggleFavoritesThunk = createAsyncThunk<OfferDTO, { offer: OfferDTO }, { extra: AxiosInstance }>(
  'offers/toggleFavorite',
  async ({offer}, {extra: api}) => {
    const response = await api.post<OfferDTO>(`favorite/${offer.id}/${offer.isFavorite ? 0 : 1}`);
    return response.data;
  }
);

const offersSlice = createSlice({
  name: 'offers',
  initialState: initialState,
  reducers: {
    setCity(state, action) {
      state.city = action.payload as string;
    },
    setSortType(state, action) {
      state.sortType = action.payload as SortType;
    },
    clearSendingReviewError(state) {
      state.error.sendingReviewError = null;
    },
    clearSendingReviewStatus(state) {
      state.status.successfullySentReview = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOffersThunk.pending, (state) => {
        state.loading.offersLoading = true;
      })
      .addCase(fetchOffersThunk.fulfilled, (state, action) => {
        state.loading.offersLoading = false;
        offersAdapter.upsertMany(state.offers, action.payload);
      })
      .addCase(fetchOffersThunk.rejected, (state, action) => {
        state.loading.offersLoading = false;
        state.error.offersError = action.error;
      })
      .addCase(fetchOfferThunk.pending, (state) => {
        state.loading.offerLoading = true;
      })
      .addCase(fetchOfferThunk.fulfilled, (state, action) => {
        state.currentOffer.offer = action.payload;
        state.loading.offerLoading = false;
      })
      .addCase(fetchOfferThunk.rejected, (state, action) => {
        state.loading.offerLoading = false;
        state.error.offerError = action.error;
        state.currentOffer.offer = null;
      })
      .addCase(fetchNearbyOffersThunk.pending, (state) => {
        state.loading.nearPlacesLoading = true;
      })
      .addCase(fetchNearbyOffersThunk.fulfilled, (state, action) => {
        state.loading.nearPlacesLoading = false;
        state.currentOffer.nearPlacesIds = action.payload.map((offer) => offer.id);
      })
      .addCase(fetchNearbyOffersThunk.rejected, (state, action) => {
        state.loading.nearPlacesLoading = false;
        state.error.offerError = action.error;
        state.currentOffer.nearPlacesIds = null;
      })
      .addCase(fetchReviewsThunk.pending, (state) => {
        state.loading.reviewsLoading = true;
      })
      .addCase(fetchReviewsThunk.fulfilled, (state, action) => {
        state.loading.reviewsLoading = false;
        state.currentOffer.reviews = action.payload;
      })
      .addCase(fetchReviewsThunk.rejected, (state, action) => {
        state.loading.reviewsLoading = false;
        state.error.offerError = action.error;
        state.currentOffer.reviews = null;
      })
      .addCase(addReviewThunk.pending, (state) => {
        state.loading.sendingReviewLoading = true;
      })
      .addCase(addReviewThunk.fulfilled, (state, action) => {
        state.currentOffer.reviews?.push(action.payload);
        state.loading.sendingReviewLoading = false;
        state.error.sendingReviewError = null;
        state.status.successfullySentReview = true;
      })
      .addCase(addReviewThunk.rejected, (state, action) => {
        state.error.sendingReviewError = action.error;
        state.loading.sendingReviewLoading = false;
      })
      .addCase(fetchFavoritesThunk.pending, (state) => {
        state.loading.favoritesLoading = true;
      })
      .addCase(fetchFavoritesThunk.fulfilled, (state, action) => {
        state.loading.favoritesLoading = false;
        offersAdapter.upsertMany(state.offers, action.payload);
      })
      .addCase(fetchFavoritesThunk.rejected, (state, action) => {
        state.loading.favoritesLoading = false;
        state.error.favoritesError = action.error;
      })
      .addCase(toggleFavoritesThunk.pending, (state) => {
        state.loading.toggleFavoriteLoading = true;
      })
      .addCase(toggleFavoritesThunk.fulfilled, (state, action) => {
        state.loading.toggleFavoriteLoading = false;
        offersAdapter.updateOne(state.offers, {id: action.payload.id, changes: {isFavorite: action.payload.isFavorite}});
        if (state.currentOffer.offer?.id === action.payload.id) {
          state.currentOffer.offer = action.payload;
        }
      })
      .addCase(toggleFavoritesThunk.rejected, (state, action) => {
        state.loading.toggleFavoriteLoading = false;
        state.error.toggleFavoriteError = action.error;
      })
      .addMatcher(isAnyOf(loginThunk.rejected, checkAuthThunk.rejected, logoutThunk.fulfilled),
        (state) => {
          const entities = Object.values(state.offers.entities)
            .filter((offer) => offer !== undefined)
            .map((offer) => (
              {
                ...offer,
                isFavorite: false
              } as OfferDTO));
          offersAdapter.upsertMany(state.offers, entities);
          if (state.currentOffer.offer) {
            state.currentOffer.offer.isFavorite = false;
          }
        }
      );
  },
});

export const {setCity, setSortType, clearSendingReviewError, clearSendingReviewStatus} = offersSlice.actions;
export const offersReducer = offersSlice.reducer;
