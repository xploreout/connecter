import React from 'react';
import axios from 'axios';
import { GET_POST, ERROR_POST } from './types';



export const post = () => async (dispatch) => {

  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const res = await axios.get('/api/post/${}', config);

    dispatch ({
      type: GET_POST,
      payload: res.data,
      loading: false
    })
    
  } catch (error) {
    dispatch ({
      type: ERROR_POST,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    })
  }
}
