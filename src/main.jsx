import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";
import { AppContextProvider } from "./context/AppContext.jsx";
import { ToasterContainer } from "./components/global/Toaster.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AppContextProvider>
        <ToasterContainer />
        <App />
      </AppContextProvider>
    </BrowserRouter>
  </StrictMode>
);
