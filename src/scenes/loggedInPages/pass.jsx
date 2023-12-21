import { Box, useTheme } from "@mui/material";
import { useContext, useState } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import { useNavigate } from 'react-router-dom';



const Pass = () =>{
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);
    return (
        <Box display = "flex" backgroundColor={colors.primary[400]} borderRadius="10px" width={"25%"} height={"30%"} marginLeft={"40%"} flexDirection="column">
            <Box>
                <h1>Hello WOrld</h1>  

            </Box>
        </Box>
        
    )
}

export default Pass;