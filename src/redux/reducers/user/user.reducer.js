/*
  This reducer contains the information about users
*/
import {
  SET_ACTIVE_USER_ID,
  SET_USERS
} from "./user.types";

export const user = (state = {
  activeUserId: null,
  users: {}
}, action) => {
  switch (action.type) {
    case SET_ACTIVE_USER_ID:
      return {
        ...state,
        activeUserId: action.payload.id
      }
    case SET_USERS:
      return {
        ...state,
        users: action.payload.users
      }
    default:
      return state;
  }
}