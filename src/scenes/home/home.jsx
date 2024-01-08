// do all the about me page here. 
import { Box, useTheme } from "@mui/material";
import { useContext, useState } from "react";
import { ColorModeContext, tokens } from "../../theme";
// import InputBase from "@mui/material/InputBase";
import { useNavigate } from 'react-router-dom';
import nodeLogo from '../../img/node.png';
import pythonLogo from '../../img/pythonLogo.jpeg';
import javaLogo from '../../img/java.jpeg';
import cppLogo from '../../img/cplusplus.png';
import csLogo from '../../img/c#.jpeg';
import reactLogo from '../../img/react.png';
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
                <h2> Projects</h2>
                <p>  This is where I use cards. TODO</p>
            </Box>
            <Box display = "flex" backgroundColor={colors.primary[400]} marginLeft={"1%"} marginTop={"1%"} width={"98%"} borderRadius="10px" flexDirection="column">
                <h2 marginLeft={"10%"}> About Me! </h2>
                <p class = "mainBody"> Hi, My name is Joseph. I am currently graduating from UCR with a Major in Computer Science. I enjoy video games and the outdoors. I like to learn things the hard way.</p>
                <p class = "mainBody"> This whole page mainly functions to help me learn the react framework and nodejs.</p>
            </Box>
            <Box display = "flex" backgroundColor={colors.primary[400]} marginLeft={"1%"} marginTop={"1%"} width={"98%"} borderRadius="10px" flexDirection="column">
                <h2> Languages / tools I know</h2>
                <Box display = "grid" gridTemplateColumns={"1fr 1fr 1fr"} margin={'10px'} alignContent={'center'} >
                    <img src= {pythonLogo} alt = "Python" width = '20%' height='100%' backgroundColor='#000000000'/>
                    <img src= {nodeLogo} alt = "NodeJS" width = '20%' height='100%' backgroundColor='#000000000'/>
                    <img src= {javaLogo} alt = "Java" width = '20%' height='100%' backgroundColor='#000000000'/>
                    <img src= {cppLogo} alt = "C++" width = '20%' height='100%' backgroundColor='#000000000'/>
                    <img src= {csLogo} alt = "C#" width = '20%' height='100%' backgroundColor='#000000000'/>
                    <img src= {reactLogo} alt = "react" width = '20%' height='100%' backgroundColor='#000000000'/>
                </Box>
            </Box>
        </Box>
        
    )
}


export default Home;