
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import configure from "./redux/redux.store";
import { Provider } from "react-redux";
const { store, persistor } = configure();
import "./config/index.ts";
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
