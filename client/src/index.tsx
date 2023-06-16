import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { OathContextProvider } from "./context/oauthContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <OathContextProvider>
    <Router>
      <App />
    </Router>
  </OathContextProvider>
);
