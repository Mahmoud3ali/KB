import "./App.css";
import { MaterialUIConfig, RouterConfig, ServerStateConfig } from "./config";

function App() {
  return (
    <MaterialUIConfig>
      <ServerStateConfig>
        <RouterConfig />
      </ServerStateConfig>
    </MaterialUIConfig>
  );
}

export default App;
