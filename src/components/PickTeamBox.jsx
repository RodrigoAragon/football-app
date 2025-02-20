import { Box } from "@mui/material"
import { NavLink } from "react-router"

export const PickTeamBox = () => {
  return (
    <Box
        sx={{
            bgcolor:"white",
            width: 200,
            height: 150,
            borderRadius:1,
            alignContent: 'center',
            textAlign: 'center',

        }}
                
    >
        ¿Tenés un equipo favorito?
                
        <NavLink 
            sx={{mt:1}}
            to="/select-club"      
        >
            Asignaté tu club favorito aquí
        </NavLink>

    </Box>
  )
}
