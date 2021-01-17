/*
  This reducer contains the information about users
*/
import {
  SET_ERROR
} from "./error.types";

export const error = (state = {
  error: null
}, action) => {
  switch (action.type) {
    case SET_ERROR:
      return {
        ...state,
        error: action.payload.error
      }
    default:
      return state;
  }
}