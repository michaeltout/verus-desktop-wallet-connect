/*
  This reducer contains user navigation data to
  track where in the app navigation space the user
  is currently.
*/

import { SET_NAVIGATION_PATH } from './navigation.types'

export const navigation = (state = {
  path: '',
  pathArray: [],
}, action) => {
  switch (action.type) {
    case SET_NAVIGATION_PATH:
      return {
        ...state,
        path: action.payload.navigationPath,
        pathArray: action.payload.navigationPathArray
      };
    default:
      return state;
  }
}