import {
  GET_PROFILE,
  GET_PROFILES,
  UPDATE_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  GET_REPOS,
  NO_REPOS,
} from '../actions/types';

const initialState = {
  profile: null,
  profiles: [],
  repos: [],
  errors: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILES:
      return {
        ...state,
        profiles: payload,
        loading: false,
      };
    case GET_REPOS:
      return {
        ...state,
        repos: payload,
        loading: false,
      };
    case GET_PROFILE:
    case UPDATE_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false,
      };
    case NO_REPOS:
      return {
        ...state,
        repos: [],
      };
    case PROFILE_ERROR:
      return {
        loading: false,
        errors: payload,
        profile: null,
        ...state,
      };
    case CLEAR_PROFILE:
      return {
        loading: false,
        ...state,
        profile: null,
        repos: [],
        errors: {},
      };
    default:
      return state;
  }
}
