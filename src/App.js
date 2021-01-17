import './App.css';
import AddCoin from './components/addCoin/addCoin';
import { MOCK_IPC } from './env';
import { handleIpc } from './ipc/handlers';
import { SIMULATED_IPC_COIN_REQUEST, SIMULATED_IPC_INIT } from './__tests__/mocks';

if (MOCK_IPC) {
  setTimeout(() => {
    console.log("Sending ipc init")
    handleIpc(SIMULATED_IPC_COIN_REQUEST)
  }, 5000)
  setTimeout(() => {
    console.log("Sending ipc coin request")
    handleIpc(SIMULATED_IPC_INIT)
  }, 10000)
} else {
  window.addEventListener("message", (event) => handleIpc(event), false);
}

function App() {
  return (
    <div style={{ height: "100%", paddingLeft: 48, paddingRight: 48 }} className="App">
      <AddCoin />
    </div>
  );
}

export default App;
