// do all the about me page here. 
import {Box, useTheme, Card, CardContent, CardActions, Typography} from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
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

const Project = ({project,theme, colors}) =>{
    return (
        <Card sx={{margin:'.25%', minWidth: '250px', maxWidth:'250px', minHeight: '300px', backgroundColor:colors.primary[600]}}>
            <CardContent>
               <h2>
                    {project.title}
               </h2>
                <img src={project.screenshot} alt='screenshot'/>
            </CardContent>
            <CardActions>

            </CardActions>
        </Card>
    )
}

const Home = () =>{

    const projects = [
        {title: "example", screenshot: '../../img/react.png', description:"desc", tools: ["list of tools","2"]},
        {title: "example2", screenshot: '../../img/react.png', description:"es", tools: ["list of tools","2"]},
    ]

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
            <Box justifyContent = "space-between" backgroundColor={colors.primary[400]} marginLeft={"1%"} marginTop={"1%"} width={"98%"} borderRadius="10px">
                <Box marginLeft={"1%"} >
                    <h2>Projects</h2>
                </Box>
            </Box>
            <Box display = "flex" backgroundColor={colors.primary[400]} marginLeft={"1%"} marginTop={"1%"} width={"98%"} height= {'310px'} borderRadius="10px" flexDirection="row">
                {/*<p>  This is where I use cards. TODO</p>*/}
                {projects.map( (project) =>  <Project project={project} theme = {theme} colors = {colors}/>)}
    
            </Box>

            <Box display = "flex" backgroundColor={colors.primary[400]} marginLeft={"1%"} marginTop={"1%"} width={"98%"} borderRadius="10px" flexDirection="column">
                <Box marginLeft={ '1%'}>
                    <h2 marginLeft={"10%"}> About Me! </h2>
                    <p class = "mainBody"> Hi, My name is Joseph. I am currently graduating from UCR with a Major in Computer Science. I enjoy video games and the outdoors. I like to learn things the hard way.</p>
                    <p class = "mainBody"> This whole page mainly functions to help me learn the react framework and nodejs.</p>
                </Box>
            </Box>
            <Box display = "flex" backgroundColor={colors.primary[400]} marginLeft={"1%"} marginTop={"1%"} width={"98%"} borderRadius="10px" flexDirection="column">
                <Box marginLeft={'1%'}>
                    <h2> Languages / tools I know</h2>
                </Box>
                <Box display = "grid" gridTemplateColumns={"1fr 1fr 1fr"} margin={'10px'} alignContent={'center'} >
                    <img src= {pythonLogo} alt = "Python" width = '20%' height='100%' backgroundColor='#000000000' color={'#1290909090'}/>
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