import { GET_PROFILE, PROFILE_ERROR } from "../actions/types";

const initialState = {
  profile: {},
  profiles: [],
  repos: [],
  errors: {}
}

export default function(state=initialState, action) {
  const { type, payload } = action;

  switch(type) {
    case GET_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false
      }
    case PROFILE_ERROR:
      return {
        loading: false,
        error: payload,
        ...state
      }
    default:
      return state
  }

}
