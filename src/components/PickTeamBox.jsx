import { Box } from "@mui/material"
import { NavLink } from "react-router"

export const PickTeamBox = () => {
  return (
    <Box
        sx={{
            width: 200,
            borderRadius:1,
            alignContent: 'center',
            textAlign: 'center',
            marginLeft:65,
            marginTop:1
        }}
    >
        ¿Tenés un equipo favorito?
                
        <NavLink 
            sx={{mt:1}}
            to="/select-club"      
        >
            Elegí tu club aquí
        </NavLink>

    </Box>
  )
}
