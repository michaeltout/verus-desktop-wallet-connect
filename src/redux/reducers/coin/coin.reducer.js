/*
  This reducer contains the information about the coin
  being added
*/
import { SET_COIN_INFO } from './coin.types'

export const coin = (state = {
  ticker: "VRSCTEST",
  mode: "native",
  launchConfig: {}
}, action) => {
  switch (action.type) {
    case SET_COIN_INFO:
      return {
        ...state,
        ticker: action.payload.ticker,
        mode: action.payload.mode,
        launchConfig: action.payload.launchConfig
      };
    default:
      return state;
  }
}