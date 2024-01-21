// do all the about me page here. 
import {Box, useTheme, Card, CardContent, CardActions,CardMedia, Typography} from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import { useContext, useState } from "react";

import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

import { ColorModeContext, tokens } from "../../theme";
// import InputBase from "@mui/material/InputBase";
import { useNavigate } from 'react-router-dom';
import nodeLogo from '../../img/node.png';
import pythonLogo from '../../img/pythonLogo.jpeg';
import javaLogo from '../../img/java.jpeg';
import cppLogo from '../../img/cplusplus.png';
import csLogo from '../../img/c#.jpeg';
import reactLogo from '../../img/react.png';
import portfolio from '../../img/projectIMG/portfolio.png';
// import axios from 'axios';

const Project = ({project,theme, colors, increase, decrease}) =>{
    return (
        <Card sx={{margin:'1%', minWidth: '98%', maxWidth:'98%', minHeight: '300px', backgroundColor:colors.primary[600]}}>
            <CardContent>
               <h1>
                    {project.title}
               </h1>
                <p>
                    {project.description}
                </p>
                <img src={project.screenshot} />
            </CardContent>
            <CardActions>
                <Box display="flex" justifyContent="space-between" p={2} flexDirection={'row'} position="absolute" bottom="650px" width="90%">
                    <Box  display="flex">
                        <ArrowLeftIcon  onClick={decrease}/>
                    </Box>
                    <Box display="flex">
                        <ArrowRightIcon onClick={increase}/>
                    </Box>
                </Box>
            </CardActions>
        </Card>
    )
}

const Home = () =>{

    const projects = [
        {title: "Portfolio Website", description:"Using Javascript, React as a front end, and Nodejs as a backend, I have created a functional site where I put more of myself out there.", tools: ["list of tools","2"], screenshot: portfolio},
        {title: "ToDo Scheduler Tracker", description:"As a part two for the portfolio website, I use nodeJs and reactjs in order to create a todo scheduler with a functional calendar to view.", tools: ["list of tools","2"]},
        {title: "Salton Sea Air Filtration Website", description:"This project was done with a group of other students where we developed a system where residents and researchers could access already placed air quality sensor data. While residents are only able to view their own data, researchers are able to log in and view every data, on a map along with data visualizations. Done using NodeJs, and python.",tools:[]},
    ]
    const [projIndex, incrementprojIndex] = useState(0);
    const increaseIndex = () =>{
        let newIndex = projIndex + 1;
        if(newIndex >= projects.length){
            newIndex = 0;
        }
        incrementprojIndex(newIndex);
    }
    const decreaseIndex = () =>{
        let newIndex = projIndex - 1;
        if(newIndex < 0){
            newIndex = projects.length - 1;
        }
        incrementprojIndex(newIndex);
    }
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    // const colorMode = useContext(ColorModeContext);
    // const navigate = useNavigate();
    return (
        <Box display = "flex" marginLeft={"1%"} width={"98%"} borderRadius="10px" flexDirection="column" marginTop={"55px"}>
            <Box display = "flex" marginLeft={"1%"} width={"98%"} borderRadius="10px" flexDirection="column">
                <h1>Welcome to My Site! </h1>
                <h4>Made using React, node.js and express.js</h4>
            </Box>
            <Box justifyContent = "space-between" backgroundColor={colors.primary[400]} marginLeft={"1%"} marginTop={"1%"} width={"98%"} borderRadius="10px">
                <Box marginLeft={"1%"} >
                    <h2>Projects</h2>
                </Box>
            </Box>
            <Box display = "flex" backgroundColor={colors.primary[400]} marginLeft={"1%"} marginTop={"1%"} width={"98%"} height= {'500px'} borderRadius="10px" flexDirection="row">
                {/*<p>  This is where I use cards. TODO</p>*/}
                <Project project = {projects[projIndex]} theme={theme} colors={colors} increase ={increaseIndex} decrease = {decreaseIndex}/>
            </Box>

            <Box display = "flex" backgroundColor={colors.primary[400]} marginLeft={"1%"} marginTop={"1%"} width={"98%"} borderRadius="10px" flexDirection="column">
                <Box marginLeft={ '1%'}>
                    <h2 marginLeft={"10%"}> About Me! </h2>
                    <p class = "mainBody"> Hi, My name is Joseph. I am currently graduating from UCR with a Major in Computer Science. I enjoy video games and the outdoors. I like to learn things the hard way.</p>
                    <p class = "mainBody"> This whole page mainly functions to help me learn the react framework and nodejs.</p>
                </Box>
            </Box>
            <Box display = "flex" backgroundColor={colors.primary[400]} marginLeft={"1%"} marginTop={"1%"} width={"98%"} borderRadius="10px" flexDirection="column" height= "350px">
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