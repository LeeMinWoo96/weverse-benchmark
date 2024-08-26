import App from "./App.js";
import {createRoot} from "react-dom/client";
import WeverseApp from "./Weverse.App";

createRoot(document.getElementById("root")).render(
    // <React.StrictMode>
    <WeverseApp />
    // </React.StrictMode>
);