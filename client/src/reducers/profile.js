import { GET_PROFILE, PROFILE_ERROR, CLEAR_PROFILE} from "../actions/types";

const initialState = {
  profile: null,
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
        errors: payload,
        ...state
      }
      case CLEAR_PROFILE:
        return {
          loading: false,
          ...state,
          profile: null,
          repos: [],
          errors: {}
         }
    default:
      return state;
  }

}
