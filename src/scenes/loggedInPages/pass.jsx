import { Box, useTheme, Card } from "@mui/material";
import { useContext, useState } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';


const Pass = () =>{
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);
    // const navigate = useNavigate();
    const token = localStorage.getItem("token")
    // console.log(token)
    if(!token){
        window.location.href = "/login"
    }
    try{
        const res = axios.post("http://localhost:5000/api/validate", token);
        if(res.status !== 200){
            // navigate('/login');
            window.location.href = '/login';
        }
    } catch(error){
    }
    const events = [
        {title: 'test', start: new Date()}
    ]

    return (
        <Box display = "flex" backgroundColor={colors.primary[400]} borderRadius="10px" width={"90%"} height={"90%"} marginLeft={"10%"}>
            <Box backgroundColor={colors.primary[300]} width={"40%"} height = {"80%"} >
                <FullCalendar
                    plugins={[dayGridPlugin]}
                    initialView= 'dayGridMonth'
                    weekends={false}
                    events={events}
                    eventContent={}
                />
            </Box>

        </Box>
        
    )
}

export default Pass;