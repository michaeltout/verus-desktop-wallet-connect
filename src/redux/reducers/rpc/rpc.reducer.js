/*
  This reducer contains the information about the rpc channel that the plugin 
  will use to communicate to the wallet process
*/
import {
  SET_RPC_APP_ID,
  SET_RPC_HOST,
  SET_RPC_PASSWORD,
  SET_RPC_PORT,
  ADD_CALLED_TIME,
  SET_RPC_EXPIRY_MARGIN,
} from "./rpc.types";

export const rpc = (state = {
  port: null,
  host: null,
  password: null,
  expiryMargin: 60000,
  appId: null,
  calledTimes: []
}, action) => {
  switch (action.type) {
    case SET_RPC_APP_ID:
      return {
        ...state,
        appId: action.payload.appId,
      };
    case SET_RPC_HOST:
      return {
        ...state,
        host: action.payload.host,
      };
    case SET_RPC_PASSWORD:
      return {
        ...state,
        port: action.payload.port,
      };
    case SET_RPC_PORT:
      return {
        ...state,
        password: action.payload.password,
      };
    case SET_RPC_EXPIRY_MARGIN:
      return {
        ...state,
        expiryMargin: action.payload.expiryMargin,
      };
    case ADD_CALLED_TIME:
      let newCalledTimes = [...state.calledTimes, action.payload.time]
      newCalledTimes = newCalledTimes.filter(
        (x) =>
          x > action.payload.time - state.expiryMargin && x < action.payload.time + state.expiryMargin
      );

      return {
        ...state,
        calledTimes: newCalledTimes
      };
    default:
      return state;
  }
}