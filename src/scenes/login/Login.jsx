import { Box, useTheme } from "@mui/material";
import { useState } from "react";
import {  tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginForm = () =>{
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    // const colorMode = useContext(ColorModeContext);
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const handleUsername = (event) => {
        setUsername(event.target.value);
    }
    const handlePassword = (event) =>{
        setPassword(event.target.value);
    }
    const handleSubmit = async ()=>{
        const user = {username, password };
        
        try {
            const res = await axios.post("http://localhost:5000/api/login", user);
            // need to handle error checking here
            if(res.status === 200){
                localStorage.setItem("token", res.data.token)
                window.location.href = "/logged"
            }
            else{
                navigate("/register");
            }
        } catch (error) {
          if (error.response) {
            // The request was made and the server responded with a status code
            console.error('Server responded with status:', error.response.status);
           
            // You can handle different status codes here
            if (error.response.status === 400) {
              // Handle status code 400 (Bad Request) error
              console.error('Bad Request:', error.response.data);
              // Perform actions specific to status code 400
            }
            // Handle other status codes if needed
          } else if (error.request) {
            // The request was made but no response was received
            console.error('No response received:', error.request);
          } else {
            // Something happened in setting up the request that triggered an error
            console.error('Error:', error.message);
          }
        }
    }
    return (
        <Box display = "flex" backgroundColor={colors.primary[400]} position={"fixed"} borderRadius="10px" width={"25%"} height={"30%"} marginLeft={"40%"} marginTop={"100px"} flexDirection="column">
            <Box margin={"20px"}>
                <label>UserName</label>
            </Box>
            <Box 
                backgroundColor= {colors.primary[300]}
                borderRadius="3px"
                width={"90%"}
                height={"10%"}
                marginLeft={"20px"}
            >
                <InputBase sx = {{ ml: 2, flex: 2, width:'90%', height:'20%'}} placeholder = "Username" onChange={handleUsername}></InputBase>
                
            </Box>
            <Box margin={"20px"}>
                <label>Password</label>
            </Box>
            <Box 
                backgroundColor= {colors.primary[300]}
                borderRadius="3px"
                width={"90%"}
                height={"10%"}
                marginLeft={"20px"}
            >
                <InputBase sx = {{ ml: 2, flex: 2, width:'90%', height:'20%'}} placeholder = "Password" type = "password" onChange={handlePassword}></InputBase>
            </Box>

            <Box 
                display="flex"
                justifyContent="space-between"
                p= {2}
            >
                <Box display = "flex">
                    <button onClick={handleSubmit}>Submit</button>
                    

                </Box>
                <Box display = "flex">
                    <button onClick={()=>navigate("/register")}>Register</button>
                </Box>
                
            </Box>
        </Box>
        
    )
}

export default LoginForm;