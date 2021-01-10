import { SET_NAVIGATION_PATH } from './navigation.types'
import { readNavigationPath } from './navigation.util'

/**
 * Sets the navigation path in the redux store
 */
export const setNavigationPath = (path) => {
  const navigationArray = readNavigationPath(path)

  return {
    type: SET_NAVIGATION_PATH,
    payload: {
      navigationPath: path,
      navigationPathArray: navigationArray
    }
  }
}