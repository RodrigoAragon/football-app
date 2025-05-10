import { Box, Button, Grid2, TextField, Typography} from "@mui/material";
import { registerEmailPassword } from "../helpers/authActions";
import { NavLink } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { endRegisterFailed, endRegisterSuccess, startRegister } from "../helpers/authSlices";
import { useForm } from "react-hook-form";
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup";

export const RegisterPage = () => {
    const status = useSelector(state => state.status)
    const dispatch = useDispatch()
    
    const schema = yup
    .object({
      email: yup.string().email().required(),
      password: yup.string().min(6).max(18).required()
    })
    .required()

    yup.setLocale({
      mixed:{
        required: 'Este campo es requerido',
        email: 'El campo debe ser un email válido',
      },
      string:{
        min: 'El campo debe tener minimo ${min} caracteres',
        max: 'El campo debe tener máximo ${max} caracteres',
      },

    })

    const {register, handleSubmit, formState: {errors}
    } = useForm({
      resolver: yupResolver(schema)
    })

    const onSubmit = async({email, password}) =>{
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid2 alignContent='center' textAlign='center'>
              <Typography fontFamily='revert' variant="h4" marginBottom={4} marginLeft={4}>
                Registrese para entrar
              </Typography>
            </Grid2>

            <Grid2 size={20} marginLeft={10}>
              <TextField size="medium" {...register("email")} type="email" placeholder="Correo"/>
              <Typography color="red">{errors.email?.message}</Typography>
            </Grid2>
            
            <Grid2 size={20} marginTop={1} marginLeft={10}>
              <TextField size="medium" {...register("password")} type="password" placeholder="Contraseña"/>
              <Typography color="red">{errors.password?.message}</Typography>
            </Grid2>

            <Grid2 size={20} marginTop={1} marginLeft={15}>
              <Button 
                size="medium" 
                variant="contained" 
                type="submit"
                disabled = {status === 'checking'? true : false}
              >
                Registrarse
              </Button>
            </Grid2>

            <Grid2 size={20} marginTop={1} marginLeft={14}>
              <NavLink to="/auth/login">Volver a iniciar sesión</NavLink>
            </Grid2>

          </form>          
            
        </Box>
    </>
  )
}
