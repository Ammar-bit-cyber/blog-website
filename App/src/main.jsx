import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { router } from "./router";
import "./index.css";

gsap.registerPlugin(useGSAP);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
