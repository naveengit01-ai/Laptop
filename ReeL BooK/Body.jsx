import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Heart from "./Heart";

createRoot(document.getElementById("nerves")).render(
    <StrictMode>
        <BrowserRouter>
        <Heart />
        </BrowserRouter>
    </StrictMode>
)