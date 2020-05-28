import React from 'react';
import { GET_POST, ERROR_POST } from '../actions/types';

const initialState = {
  post: null,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_POST:
      return {
        loading: false,
        ...state,
        post: payload,
      };
    case ERROR_POST:
      return {
        loading: false,
        error: payload,
        ...state,
      };
    default:
      return state;
  }
}
