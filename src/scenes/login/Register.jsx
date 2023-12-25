import { Box, useTheme } from "@mui/material";
import { useContext, useState } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const RegisterForm = () =>{
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsername = (event) => {
        setUsername(event.target.value);
    }
    const handlePassword = (event) =>{
        setPassword(event.target.value);
    }
    const handleEmail = (event) => {
        setEmail(event.target.value);
    }
    const register = async () => {
        const user = { email, username, password };
        
        try {
            const res = await axios.post("http://localhost:5000/api/users", user);
            // need to handle error checking here
            navigate('/login');
            if(res.status===200){
                navigate('/login')
            }
            else{
                navigate('/');
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
      };
    return (
        <Box display = "flex" backgroundColor={colors.primary[400]} borderRadius="10px" width={"25%"} height={"35%"} marginLeft={"40%"} flexDirection="column">
            <Box margin={"20px"}>
                <label>Email</label>
            </Box>
            <Box 
                backgroundColor= {colors.primary[300]}
                borderRadius="3px"
                width={"90%"}
                height={"10%"}
                marginLeft={"20px"}
            >
                <InputBase sx = {{ ml: 2, flex: 2}} placeholder = "Email" onChange={handleEmail}></InputBase>
                
            </Box>
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
                <InputBase sx = {{ ml: 2, flex: 2}} placeholder = "Username" onChange={handleUsername}></InputBase>
                
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
                <InputBase sx = {{ ml: 2, flex: 2}} placeholder = "Password" onChange = {handlePassword} type = "password"></InputBase>
            </Box>
            <Box 
                margin="20px"
            >
                <button onClick={register}>Submit</button>
            </Box>
        </Box>
    )
}

export default RegisterForm;