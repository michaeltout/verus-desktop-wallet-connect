/*
  This reducer contains the information about users
*/
import {
  SET_ORIGIN_APP,
} from "./origin.types";

export const origin = (state = {
  originApp: null,
}, action) => {
  switch (action.type) {
    case SET_ORIGIN_APP:
      return {
        ...state,
        originApp: action.payload.originApp
      }
    default:
      return state;
  }
}