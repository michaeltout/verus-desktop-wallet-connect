/*
  This reducer contains the information about the rpc channel that the plugin 
  will use to communicate to the wallet process
*/
import { VERUS_DESKTOP_AUTHENTICATOR } from "../../../utils/constants";
import {
  SET_RPC_APP_ID,
  SET_RPC_PASSWORD,
  SET_RPC_PORT,
  ADD_CALLED_TIME,
  SET_RPC_EXPIRY_MARGIN,
  SET_RPC_POST_ENCRYPTION,
  SET_RPC_COIN_REQUEST,
  SET_RPC_WINDOW_ID
} from "./rpc.types";

export const rpc = (state = {
  port: null,
  password: null,
  expiryMargin: 60000,
  appId: VERUS_DESKTOP_AUTHENTICATOR,
  calledTimes: [],
  postEncryption: true,
  windowId: null,
  coinRequest: {
    chainTicker: null,
    mode: null,
    launchConfig: {},
    originDappInfo: {}
  },
}, action) => {
  switch (action.type) {
    case SET_RPC_APP_ID:
      return {
        ...state,
        appId: action.payload.appId,
      };
    case SET_RPC_PASSWORD:
      return {
        ...state,
        password: action.payload.password,
      };
    case SET_RPC_PORT:
      return {
        ...state,
        port: action.payload.port,
      };
    case SET_RPC_EXPIRY_MARGIN:
      return {
        ...state,
        expiryMargin: action.payload.expiryMargin,
      };
    case SET_RPC_POST_ENCRYPTION:
      return {
        ...state,
        postEncryption: action.payload.encryption,
      };
    case SET_RPC_WINDOW_ID:
      return {
        ...state,
        windowId: action.payload.windowId,
      };
    case SET_RPC_COIN_REQUEST:
      return {
        ...state,
        coinRequest: action.payload.coinRequest
      }
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