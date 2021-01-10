import { SET_COIN_INFO } from './coin.types'

/**
 * Sets the navigation path in the redux store
 */
export const setCoinInfo = (ticker, mode, launchConfig = {}) => {
  return {
    type: SET_COIN_INFO,
    payload: {
      ticker,
      mode,
      launchConfig
    }
  }
}