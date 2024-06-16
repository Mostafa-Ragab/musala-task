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

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Routes>
          
            <Route path="/" element={<SignIn />} />
            <Route path="/login" element={<SignIn />} />

            <Route
              path="/sign-up"
              element={
                <main className="content login">
                  <Register />
                </main>
              }
            />
            <Route
              path="/*"
              element={
                <ProtectedRoute>
                  <>
                    <Sidebar isSidebar={isSidebar} />
                    <main className="content">
                      <Topbar setIsSidebar={setIsSidebar} />
                      <Routes>
                        <Route path="/flights" element={<Flights />} />
                        <Route path="/flights/add-flights" element={<Form />} />
                        <Route path="/flights/edit/:id" element={<Form />} />
                        <Route
                          path="/flights/edit-photo/:id"
                          element={<Photo />}
                        />
                        <Route path="/user" element={<Register />} />
                        <Route path="*" element={<Error />} />
                      </Routes>
                    </main>
                  </>
                </ProtectedRoute>
              }
            />

            <Route path="/404" element={<Error />} />
          </Routes>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
