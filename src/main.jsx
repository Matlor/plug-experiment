import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { Buffer } from "buffer";
globalThis.Buffer = Buffer;

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
