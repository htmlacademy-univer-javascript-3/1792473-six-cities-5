import {createAsyncThunk, createSlice, SerializedError} from '@reduxjs/toolkit';
import {UserDTO} from '../types';
import {AxiosInstance} from 'axios';
import {saveToken, removeToken} from '../services/token.ts';

export enum AuthorizationStatus {
  Auth = 'Auth',
  NoAuth = 'NoAuth',
  Unknown = 'Unknown'
}

export interface AuthState {
  authorizationStatus: AuthorizationStatus;
  user: UserDTO | null;
  isLoading: boolean;
  error: SerializedError | null;
}

const initialState: AuthState = {
  authorizationStatus: AuthorizationStatus.Unknown,
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

export const logoutThunk = createAsyncThunk<void, void, { extra: AxiosInstance }>(
  'auth/logout',
  async (_, { extra: api}) => {
    await api.delete('/logout');
    removeToken();
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
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
        state.authorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(checkAuthThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.error = action.error;
      })
      .addCase(loginThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.authorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.error = action.error;
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.user = null as UserDTO | null;
      });
  },
});

export const authReducer = authSlice.reducer;
