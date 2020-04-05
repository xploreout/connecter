import { REGISTER_SUCCESS, REGISTER_FAIL } from '../actions/types';
import axios from 'axios';

const initialState = {
  loading: true,
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  user
}

export default function(state=initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case REGISTER_SUCCESS:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      }
    case REGISTER_FAIL: 
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        loading: false,
        isAuthenticated: false
      }
    default:
      return state
  }
}