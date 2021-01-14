import { SET_ORIGIN_APP } from "./origin.types";

export const setOriginApp = (originApp) => {
  return {
    type: SET_ORIGIN_APP,
    payload: {
      originApp
    }
  }
}