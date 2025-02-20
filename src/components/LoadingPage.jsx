import { Box } from "@mui/material"

export const LoadingPage = () => {
  return (
    <>
        <Box sx={{ 
            bgcolor: 'white', 
            fontFamily:'sans-serif',
            width: 200,
            height: 50,
            borderRadius: 1,
            textAlign: 'center',
            alignContent: 'center',
            mt: 30,
            mx: 'auto'
            }}>
            Cargando...
        </Box>
    
    </>
  )
}
