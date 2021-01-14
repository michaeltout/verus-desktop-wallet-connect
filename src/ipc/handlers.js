import { DEVMODE, MOCK_IPC } from "../env"
import { RPC_PASSWORD } from "../__tests__/mocks"
import { setRpcCoinRequest, setRpcExpiryMargin, setRpcPassword, setRpcPort, setRpcPostEncryption } from "../redux/reducers/rpc/rpc.actions"
import store from "../redux/store"
import { IPC_COIN_REQUEST_METHOD, IPC_INIT_MESSAGE, IPC_ORIGIN_DEV, IPC_ORIGIN_PRODUCTION, IPC_PUSH_MESSAGE } from "../utils/constants"
import { setOriginApp } from "../redux/reducers/origin/origin.actions"
import { getPlugin } from "../rpc/calls/getPlugin"

export const handleIpc = async (event) => {
  if ((!DEVMODE && event.origin === IPC_ORIGIN_PRODUCTION) || (DEVMODE && event.origin === IPC_ORIGIN_DEV)) {
    const data = JSON.parse(event.data)

    if (data.type === IPC_INIT_MESSAGE) {
      store.dispatch(setRpcExpiryMargin(data.data.expiry_margin))
      store.dispatch(setRpcPort(data.data.rpc_port))
      store.dispatch(setRpcPostEncryption(data.data.post_encryption))

      try {
        if (MOCK_IPC) store.dispatch(setRpcPassword(RPC_PASSWORD))
        else store.dispatch(setRpcPassword(window.bridge.getSecretSync().BuiltinSecret))
      } catch(e) {
        console.error("Error loading api secrets!")
        console.error(e)
      }
    } else if (data.type === IPC_PUSH_MESSAGE && data.method === IPC_COIN_REQUEST_METHOD) {
      store.dispatch(setRpcCoinRequest({
        chainTicker: data.data.ticker,
        mode: data.data.mode,
        launchConfig: data.data.launch_config,
        originAppInfo: data.data.origin_app_info,
      }))
      store.dispatch(setOriginApp(await getPlugin(data.data.origin_app_info.id, data.data.origin_app_info.search_builtin)))
    }
  } else {
    console.log(`[IPC] recieved event message from unapproved origin (${event.origin}), blocked`)
  }
}