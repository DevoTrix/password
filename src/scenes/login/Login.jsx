import { Box, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";


const LoginForm = () =>{
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);
    return (
        <Box display = "flex" backgroundColor={colors.primary[400]} borderRadius="10px" width={"25%"} height={"30%"} marginLeft={"40%"} flexDirection="column">
            <Box margin={"20px"}>
                <label>UserName</label>
            </Box>
            <Box 
                backgroundColor= {colors.primary[600]}
                borderRadius="3px"
                width={"90%"}
                height={"10%"}
                marginLeft={"20px"}
            >
                <InputBase sx = {{ ml: 2, flex: 2}} placeholder = "Username"></InputBase>
                
            </Box>
            <Box margin={"20px"}>
                <label>Password</label>
            </Box>
            <Box 
                backgroundColor= {colors.primary[600]}
                borderRadius="3px"
                width={"90%"}
                height={"10%"}
                marginLeft={"20px"}
            >
                <InputBase sx = {{ ml: 2, flex: 2}} placeholder = "Password"></InputBase>
            </Box>

        </Box>
    )
}

export default LoginForm;