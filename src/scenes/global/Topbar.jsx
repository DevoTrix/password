import { Box, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import SearchIcon from "@mui/icons-material/Search"
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import {useLocation} from "react-router-dom"
import {useNavigate } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import GitHubIcon from '@mui/icons-material/GitHub';
const Topbar = () =>{
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);
    const location = useLocation();
    const navigate = useNavigate();
    const handleLog = () =>{
        if(location.pathname === "/" || location.pathname === "/home"){
            navigate("/login");
        }else{
            localStorage.removeItem("token");
            navigate("/");
        }
    }
    return (
        <Box display = "flex" justifyContent = "space-between" p = {2}>
            <Box 
                display="flex"
                backgroundColor={colors.primary[400]}
                borderRadius="3px"
            >
                <InputBase sx = {{ ml: 2, flex: 1}} placeholder = "search"></InputBase>
                <IconButton type = "button" sx = {{ p:1}}>
                    <SearchIcon />
                </IconButton>
            </Box>

            <Box display="flex">
                <IconButton>
                    {location.pathname === "/pass"  ? (
                        <AddIcon />
                    ) : (
                        <GitHubIcon />
                    )}
                </IconButton>
                <IconButton onClick = {colorMode.toggleColorMode}>
                    {theme.palette.mode === "dark" ? (
                <DarkModeOutlinedIcon />
                ) : (
                <LightModeOutlinedIcon />
                )}
                </IconButton>
                <IconButton onClick= {handleLog}>
                    {location.pathname === "/" || location.pathname === "/home" ? (
                        <LoginIcon />
                    ) : (
                        <LogoutIcon />
                    )}
                </IconButton>
                
            </Box>
        </Box>
    );
};

export default Topbar;