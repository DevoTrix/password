// do all the about me page here. 
import { Box, useTheme } from "@mui/material";
import { useContext, useState } from "react";
import { ColorModeContext, tokens } from "../../theme";
// import InputBase from "@mui/material/InputBase";
import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

const Home = () =>{
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    // const colorMode = useContext(ColorModeContext);
    // const navigate = useNavigate();
    return (
        <Box display = "flex" marginLeft={"1%"} width={"98%"} borderRadius="10px" flexDirection="column">
            <Box display = "flex" marginLeft={"1%"} width={"98%"} borderRadius="10px" flexDirection="column">
                <h1>Welcome to My Site! </h1>
                <h4>Made using React, node.js and express.js</h4>
            </Box>
            <Box display = "flex" backgroundColor={colors.primary[400]} marginLeft={"1%"} marginTop={"1%"} width={"98%"} borderRadius="10px" flexDirection="column">
                <h2> Goals For this page! </h2>
                <p> Initial Goals for this page was in </p>
            </Box>
            <Box display = "flex" backgroundColor={colors.primary[400]} marginLeft={"1%"} marginTop={"1%"} width={"98%"} borderRadius="10px" flexDirection="column">
                <h2> About Me! </h2>
            </Box>
        </Box>
        
    )
}


export default Home;