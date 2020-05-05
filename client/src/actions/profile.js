import axios from 'axios';
import { GET_PROFILE, PROFILE_ERROR } from './types';
import { setAlert } from './alert';

export const getCurrentProfile = () => async dispatch => {
  try {
    const res = await axios.get('/api/profile/me');
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (error) {
    console.log(error.msg);
    dispatch({
      type: PROFILE_ERROR,
      // payload: { msg: error.response.statusText,
      payload: { msg: error.response.data.msg, status: error.response.status }
    });
  }
};

export const createProfile = (
  formData,
  history,
  edit=false
) => async dispatch => {

  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const res = await axios.post('/api/profile', formData, config);
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });

    dispatch(setAlert(edit ? 'Profile updated' : 'Profile created', 'success'));

    if (!edit) {
      history.push('/dashboard');
    }
  } catch (error) {
    console.log(`error is ${error}`);
    dispatch({
      type: PROFILE_ERROR,
      // payload: { msg: error.response.statusText, msg: error.response.data.msg,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

export const addExperience = (formData, history, edit=true) => async dispatch => {

  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
   const res = await axios.put('/api/profile/experience', formData, config);

    dispatch ({
      type: GET_PROFILE,
      payload: res.data
    });

    dispatch(setAlert(edit ? 'Profile updated' : 'Profile created', 'success'));

    history.push('/dashboard');

  } catch (error) {
    console.log(`error.mas ${error}`);
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status}
    });
  }
};




