import { useDispatch } from "react-redux"
import { endSignOut, startSignOut } from "../auth/helpers/authSlices"
import { Box, Button, Typography } from "@mui/material"

export const SignOutBox = ({user}) => {

    const dispatch = useDispatch()

    const handleSignOut = () =>{
    try {
        dispatch(startSignOut())
        dispatch(endSignOut())
        localStorage.clear()
    } catch (error) {
        console.log(error)
    }
}
  return (
    <Box 
        bgcolor="white"
        sx={{ 
            width: 200, 
            height:150,
        }} 
        textAlign="center" 
        alignContent="center"
        borderRadius={1}
    >
        {
            user.displayName
            ? <Typography alignContent="center"textAlign="center"> Bienvenido, {user.displayName}</Typography>
            : <></>
        }
                
        <Button 
            variant="contained" 
            onClick={handleSignOut}
            color="error"
            sx={{
            mt:1,
            }}
        >
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z"/></svg>
            Cerrar sesión
        </Button>
    </Box>
  )
}
