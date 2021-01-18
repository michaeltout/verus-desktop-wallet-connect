import { SET_ORIGIN_APP, SET_ORIGIN_APP_ID, SET_ORIGIN_APP_TYPE } from "./origin.types";

export const setOriginApp = (originDapp) => {
  return {
    type: SET_ORIGIN_APP,
    payload: {
      originDapp
    }
  }
}

export const setOriginAppId = (originDappId) => {
  return {
    type: SET_ORIGIN_APP_ID,
    payload: {
      originDappId
    }
  }
}

export const setOriginAppBuiltin = (originDappBuiltin) => {
  return {
    type: SET_ORIGIN_APP_TYPE,
    payload: {
      originDappBuiltin
    }
  }
}