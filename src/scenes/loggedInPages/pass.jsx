import { Box, useTheme, Card } from "@mui/material";
import { useContext, useState } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { isAuthenticated } from "../login/Login";


const pass = (
    username,
    site,
    password,
) =>{
    
    return (
    <Card>
        <h1>Site: {site} </h1>
        <h2>Username: {username}</h2>
    </Card>
    )
}
const Pass = () =>{
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);
    const navigate = useNavigate();
    // if(!isAuthenticated || isAuthenticated === null){
    //     navigate('/login')
    // } )
    
    // check if the current token stored in local storage is valid...
    // else redirect to login
    const token = localStorage.getItem("token")
    try{
        const res = axios.post("http://localhost:5000/api/validate", token);
        if(res.status !== 200){
            navigate('/login');
            window.location.reload();
        }
    } catch(error){
        navigate('/login');
        window.location.reload();
    }

    try{
        const res = axios.post("http://localhost:5000/api/getPass", token);

    }catch(error){
        console.log("error: {error}")
    }
    return (
        <Box display = "flex" backgroundColor={colors.primary[400]} borderRadius="10px" width={"25%"} height={"30%"} marginLeft={"40%"} flexDirection="column">
            <Box>
                <h1>Hi</h1>  

            </Box>
        </Box>
        
    )
}

export default Pass;