/*
  This reducer contains user navigation data to
  track where in the app navigation space the user
  is currently.
*/

import { AUTHORIZE_COIN } from '../../../utils/constants';
import { SET_EXTERNAL_ACTION, SET_NAVIGATION_PATH } from './navigation.types'

export const navigation = (state = {
  path: AUTHORIZE_COIN,
  pathArray: [AUTHORIZE_COIN],
  externalAction: ""
}, action) => {
  switch (action.type) {
    case SET_NAVIGATION_PATH:
      return {
        ...state,
        path: action.payload.navigationPath,
        pathArray: action.payload.navigationPathArray
      };
    case SET_EXTERNAL_ACTION:
      return {
        ...state,
        externalAction: action.payload.externalAction
      };
    default:
      return state;
  }
}