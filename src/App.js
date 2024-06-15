import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Topbar from "./components/Topbar/Topbar";
import Sidebar from "./components/sideBar/SideBar";
import SignIn from "./pages/sign-in/SignIn";
import Flights from "./pages/flights/Flights";
import Register from "./pages/Register";
import Error from "./pages/error";
import Form from "./pages/edit-page/index";
import Photo from "./pages/edit-photo/photo";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { useLocation } from "react-router-dom";
import { jwtDecode } from 'jwt-decode'

function App() {
  const [theme, colorMode] = useMode()
  const [isSidebar, setIsSidebar] = useState(true)

  let location = useLocation()
  let navigate = useNavigate()

  useEffect(() => {
    const checkTokenValidity = () => {
      const user = JSON.parse(localStorage.getItem('user'))
      console.log("token", user);
      if (!user) {
        console.log("no existe token-->LOGOUT--", user);
        navigate('/login')
        return;
      }

      const decodedToken = jwtDecode(user.token)
      const tokenExpiration = decodedToken.exp
      console.log("decodedToken", decodedToken)
      console.log("decodedToken", tokenExpiration)
      console.log("decodedToken", Math.floor(Date.now() / 1000))
      // if (tokenExpiration > Math.floor(Date.now() / 1000)) {
      //   console.log("ok")
      //   localStorage.removeItem('user')
      //   navigate('/login')
      // }
    };
    checkTokenValidity()
  }, [])

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {(location.pathname === '/' || location.pathname === '/login') ? (
          <div className="app" >
            <main className="content">
              <Routes>
                <Route path="/" element={<SignIn />} />
                <Route path="/login" element={<SignIn />} />
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
                <Route path="/flights" element={<Flights />} />
                <Route path="/flights/add-flights" element={<Form />} />
                <Route path="/fligths/edit/:id" element={<Form />} />
                <Route path="/fligths/edit-photo/:id" element={<Photo />} />
                <Route path="/sign-up" element={<Register />} />
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
