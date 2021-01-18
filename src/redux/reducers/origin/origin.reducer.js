/*
  This reducer contains the information about users
*/
import {
  SET_ORIGIN_APP,
  SET_ORIGIN_APP_ID,
  SET_ORIGIN_APP_TYPE
} from "./origin.types";

export const origin = (state = {
  originDapp: null,
  originDappId: null,
  originDappBuiltin: null
}, action) => {
  switch (action.type) {
    case SET_ORIGIN_APP:
      return {
        ...state,
        originDapp: action.payload.originDapp
      }
    case SET_ORIGIN_APP_ID:
      return {
        ...state,
        originDappId: action.payload.originDappId
      }
    case SET_ORIGIN_APP_TYPE:
      return {
        ...state,
        originDappBuiltin: action.payload.originDappBuiltin
      }
    default:
      return state;
  }
}