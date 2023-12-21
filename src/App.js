import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Topbar from "./scenes/global/Topbar"
import LoginForm from "./scenes/login/Login"
import RegisterForm from "./scenes/login/Register";
import Pass from "./scenes/loggedInPages/pass"
import {Routes, Route} from "react-router-dom"
function App() {
    const [theme, colorMode] = useMode();
    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <div className="app">
                    <main className = "content">
                        <Topbar />
                        <Routes>
                            <Route path = "/login" element={<LoginForm />} />
                            <Route path = "/register" element = {<RegisterForm /> } />
                            <Route path = "/logged" element = {<Pass /> } />
                        </Routes>
                    </main>
                </div>;
            </ThemeProvider>
        </ColorModeContext.Provider>
    )
}

export default App;