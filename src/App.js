import './App.css';
import AddCoin from './components/connectUI/connectUI';
import { initConnection } from './connector/init';
import { MOCK_IPC } from './env';
import { handleIpc } from './ipc/handlers';
import store from './redux/store';
import { SIMULATED_IPC_INIT } from './__tests__/mocks';

if (MOCK_IPC) {
  setTimeout(() => {
    console.log("Sending ipc init")
    handleIpc(SIMULATED_IPC_INIT)
  }, 5000)
} else {
  window.addEventListener("message", (event) => handleIpc(event), false);
}

// TESTING ONLY: Delete before production
window.readUri = (uri) => {
  initConnection(uri);
}

window.printStore = () => {
  return store.getState()
}

function App() {
  return (
    <div style={{ height: "100%", paddingLeft: 48, paddingRight: 48 }} className="App">
      <AddCoin />
    </div>
  );
}

export default App;
