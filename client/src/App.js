import { CssBaseline, ThemeProvider } from "@mui/material"; // CssBaseline resets everything in terms of CSS for code to have more defaults automatically
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "theme";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "scenes/dashboard";
import Layout from "scenes/layout";


function App() {
  const mode = useSelector((state) => state.global.mode); // Way to grab global state from within state folder (index.js)
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);  // Passing theme settings and global state to set up environment for light/dark mode
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
