import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { UserInputProvider } from "./context/UserInputContext.jsx";
import { ToggleThemeProvider } from "./context/ToggleThemeContext.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ToggleThemeProvider>
      <UserInputProvider>
        <App />
      </UserInputProvider>
    </ToggleThemeProvider>
  </React.StrictMode>
);
