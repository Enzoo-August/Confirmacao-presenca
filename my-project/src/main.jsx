import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./style.css"; // importa o CSS (onde está configurado o Tailwind)

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
