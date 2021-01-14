import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store';
import { handleIpc } from './ipc/handlers';
import { MOCK_IPC } from './env';
import { SIMULATED_IPC_INIT, SIMULATED_IPC_COIN_REQUEST } from './__tests__/mocks';
import ErrorBoundary from './components/addCoin/error/ErrorBoundary';

if (MOCK_IPC) {
  setTimeout(() => {
    console.log("Sending ipc init")
    handleIpc(SIMULATED_IPC_INIT)
  }, 5000)
  setTimeout(() => {
    console.log("Sending ipc coin request")
    handleIpc(SIMULATED_IPC_COIN_REQUEST)
  }, 10000)
} else {
  window.addEventListener("message", (event) => handleIpc(event), false);
}

// Use for debugging store
// window.printStore = () => {
//   console.log(store.getState())
// }

ReactDOM.render(
  <ErrorBoundary>
    <Provider store={store}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>
  </ErrorBoundary>,
  document.getElementById('root')
);
