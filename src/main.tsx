import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "next-themes";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* next-themes ThemeProvider is used by the Sonner <Toaster> component.
        Our own useTheme hook handles the class toggling independently,
        but we keep ThemeProvider so library components stay in sync. */}
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      storageKey="portfolio-theme"
      disableTransitionOnChange={false}
    >
      <App />
    </ThemeProvider>
  </StrictMode>,
);
