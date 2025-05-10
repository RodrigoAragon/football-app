import { Box, Button } from "@mui/material"

export const TeamBox = ({favoriteTeam, deleteTeam} ) => {
  return (

    <>
    <Box
        sx={{
          width: 200,
          borderRadius:1,
          alignContent: 'center',
          textAlign: 'center',
          marginLeft:65,
          marginTop:1,
          marginBottom:1
        }}
    >
        Hincha de {favoriteTeam.team}
        <img src={favoriteTeam.teamPhoto}></img>
        <Button variant="contained" color="error" onClick={deleteTeam}>Cambiar de equipo</Button>
    </Box>
    </>
    
  )
}
