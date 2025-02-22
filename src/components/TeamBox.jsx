import { Box, Button } from "@mui/material"

export const TeamBox = ({favoriteTeam, deleteTeam} ) => {
  return (

    <>
    <Box
        sx={{
            bgcolor:'white',
            width: 200,
            height: 150,
            alignContent:'center',
            textAlign:'center',
            borderRadius:1,
        }}
    >
        Hincha de {favoriteTeam.team}
        <img src={favoriteTeam.teamPhoto} width={100}></img>
    </Box>

    <Box
        sx={{
          bgcolor:'white',
          width: 200,
          height: 150,
          alignContent:'center',
          textAlign:'center',
          borderRadius:1,
          mt:2
      }}
    >
      <p>¿Te equivocaste de equipo? Haz clic abajo para cambiar de equipo</p>
      <Button variant="contained" color="error" onClick={deleteTeam}>Cambiar de equipo</Button>
    </Box>
    </>
    
  )
}
