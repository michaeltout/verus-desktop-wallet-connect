import { SET_RPC_APP_ID, SET_RPC_EXPIRY_MARGIN, SET_RPC_HOST, SET_RPC_PASSWORD, SET_RPC_PORT } from './rpc.types'

export const setRpcAppId = (appId) => {
  return {
    type: SET_RPC_APP_ID,
    payload: {
      appId
    }
  }
}

export const setRpcHost = (host) => {
  return {
    type: SET_RPC_HOST,
    payload: {
      host
    }
  }
}

export const setRpcPassword = (password) => {
  return {
    type: SET_RPC_PASSWORD,
    payload: {
      password
    }
  }
}

export const setRpcPort = (port) => {
  return {
    type: SET_RPC_PORT,
    payload: {
      port
    }
  }
}

export const setRpcExiryMargin = (expiryMargin) => {
  return {
    type: SET_RPC_EXPIRY_MARGIN,
    payload: {
      expiryMargin
    }
  }
}

export const addCalledTime = (time) => {
  return {
    type: ADD_CALLED_TIME,
    payload: {
      time
    }
  }
}