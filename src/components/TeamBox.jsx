import { Box } from "@mui/material"

export const TeamBox = ({favoriteTeam}) => {
  return (
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
  )
}
