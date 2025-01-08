import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {UserDTO} from '../types';
import {AxiosInstance} from 'axios';
import {saveToken, removeToken} from '../services/token.ts';

export enum AuthorizationStatus {
  AUTH = 'AUTH',
  NO_AUTH = 'NO_AUTH',
  UNKNOWN = 'UNKNOWN'
}

export interface AuthState {
  authorizationStatus: AuthorizationStatus;
  user: UserDTO | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  authorizationStatus: AuthorizationStatus.UNKNOWN,
  user: null,
  isLoading: false,
  error: null
};

export interface AuthDTO extends UserDTO {
  token: string;
}

export const checkAuthThunk = createAsyncThunk<AuthDTO, void, { extra: AxiosInstance }>(
  'auth/checkAuth',
  async (_, { extra: api}) => {
    const response = await api.get<AuthDTO>('/login');
    return response.data;
  }
);

export const loginThunk = createAsyncThunk<AuthDTO, { email: string; password: string }, { extra: AxiosInstance }>(
  'auth/login',
  async ({ email, password }, { extra: api}) => {
    const response = await api.post<AuthDTO>('/login', { email, password });
    saveToken(response.data.token);
    return response.data;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setAuthorizationStatus(state, action) {
      state.authorizationStatus = action.payload as AuthorizationStatus;
    },
    setUser(state, action) {
      state.user = action.payload as UserDTO;
    },
    logout(state) {
      removeToken();
      state.authorizationStatus = AuthorizationStatus.NO_AUTH;
      state.user = null as UserDTO | null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAuthThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(checkAuthThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.authorizationStatus = AuthorizationStatus.AUTH;
      })
      .addCase(checkAuthThunk.rejected, (state) => {
        state.isLoading = false;
        state.authorizationStatus = AuthorizationStatus.NO_AUTH;
      })
      .addCase(loginThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.authorizationStatus = AuthorizationStatus.AUTH;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.authorizationStatus = AuthorizationStatus.NO_AUTH;
        state.error = action.error.message ?? 'Failed to authorize';
      });
  },
});

export const {logout} = authSlice.actions;
export const authReducer = authSlice.reducer;
