import { Box, Button, Grid2, TextField} from "@mui/material";
import { useForm } from "../../hooks/useForm";
import { registerEmailPassword } from "../helpers/authActions";
import { NavLink } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { endRegisterFailed, endRegisterSuccess, startRegister } from "../helpers/authSlices";

export const RegisterPage = () => {

    const {formState, onInputChange} = useForm()
    const status = useSelector(state => state.status)
    const dispatch = useDispatch()

    const handleSubmit = async({email, password}) =>{
      try {
        dispatch(startRegister())
        const resp = await registerEmailPassword(email, password)
        console.log(resp)
        dispatch(endRegisterSuccess(resp.user))
      } catch (error) {
        console.log(error)
        dispatch(endRegisterFailed(error))
      }
    }

  return (
      <>

        <Box
        sx={{
          height:400,
          justifyContent: 'center',
          alignItems:'center',
          display:'flex',
          bgcolor: 'white',
          borderRadius: 1,
          mb: 5,
          mx: 'auto'
        }}
        marginTop={{xs: 15, sm: 2, md: 2, lg: 2 }}
        width={{xs: 350, sm: 400, md: 400, lg:400 }}

        >
          <Grid2 container rowSpacing={1} textAlign="center">
            <Grid2 size={20} >
              <TextField size="medium" name="email" type="email" placeholder="Correo" onChange={onInputChange}/>
            </Grid2>
            
            <Grid2 size={20}>
              <TextField size="medium" type="password" placeholder="Contraseña" name="password" onChange={onInputChange}/>
            </Grid2>

            <Grid2 size={20}>
              <Button 
                size="medium" 
                variant="contained" 
                onClick={() => handleSubmit(formState)}
                disabled= {status === 'checking'? 'true' : ''}
              >
                Registrarse
              </Button>
            </Grid2>

            <Grid2 size={20}>
              <NavLink to="/auth/login">Volver a iniciar sesión</NavLink>
            </Grid2>

          </Grid2>          
            
        </Box>
    </>
  )
}
