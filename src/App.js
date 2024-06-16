import {  useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./components/Topbar/Topbar";
import Sidebar from "./components/sideBar/SideBar";
import SignIn from "./pages/sign-in/SignIn";
import Flights from "./pages/flights/Flights";
import Register from "./pages/Register";
import Error from "./pages/error";
import Form from "./pages/edit-flight/index";
import Photo from "./pages/edit-photo/photo";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import ProtectedRoute from "./components/protectedRoute";
import { useLocation } from "react-router-dom";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  let location = useLocation()

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {(location.pathname === '/' || location.pathname === '/login' || location.pathname === '/sign-up') ? (
          <div className="app">
            <main className="content login">
              <Routes>
                <Route path="/" element={<SignIn />} />
                <Route path="/login" element={<SignIn />} />
                <Route path="/sign-up" element={<Register />} />
                <Route path="/404" element={<Error />} />
                <Route path="*" element={<Error />} />
              </Routes>
            </main>
          </div>
        ) : (
          <div className="app">
            <Sidebar isSidebar={isSidebar} />
            <main className="content">
              <Topbar setIsSidebar={setIsSidebar} />
              <Routes>
                <Route path="/" element={<SignIn />} />
                <Route path="/login" element={<SignIn />} />
                <Route path="/flights" element={<ProtectedRoute><Flights /></ProtectedRoute>} />
                <Route path="/flights/add-flights" element={<ProtectedRoute><Form /></ProtectedRoute>} />
                <Route path="/fligths/edit/:id" element={<ProtectedRoute><Form /></ProtectedRoute>} />
                <Route path="/fligths/edit-photo/:id" element={<ProtectedRoute><Photo /></ProtectedRoute>} />
                <Route path="/user" element={<Register />} />
                <Route path="/404" element={<Error />} />
                <Route path="*" element={<Error />} />
              </Routes>
            </main>
          </div>
        )
        }
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
