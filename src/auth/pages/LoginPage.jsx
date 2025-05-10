import { Box, Button, Grid2, TextField, Typography} from "@mui/material";
import { NavLink } from "react-router";
import { loginEmailPassword, loginWithGoogle } from "../helpers/authActions";
import { useDispatch, useSelector } from "react-redux";
import { endLoginFailed, endLoginSuccess, startLogin } from "../helpers/authSlices";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup";


export const LoginPage = () => {

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
        dispatch(startLogin())
        const resp = await loginEmailPassword(email,password)
        dispatch(endLoginSuccess(resp.user))
        localStorage.setItem('user', JSON.stringify(resp.user))
      } catch (error) {
        console.log(error)
        dispatch(endLoginFailed(error))
      }
    }    

    const startGoogleSignIn = async () => {
      try {
        dispatch(startLogin())
        const resp = await loginWithGoogle()
        dispatch(endLoginSuccess(resp.user))
        localStorage.setItem('user', JSON.stringify(resp.user))
      } catch (error) {
        console.log(error)
        dispatch(endLoginFailed(error))
      }
    }

    useEffect(() => { ///Este useEffect es porque el error al cerrar el popup tarda demasiado en llegar
      // Override setTimeout for Firebase polling
      (function () {
        const originalSetTimeout = window.setTimeout;
        window.setTimeout = function (fn, delay, ...args) {
          if (delay === 8000) {
            delay = 500; // Shorten Firebase's default polling delay to 1000ms
          }
          return originalSetTimeout(fn, delay, ...args);
        };
      })();
    }, []);

    
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
            <form onSubmit= {handleSubmit(onSubmit)}>
              <Grid2 alignContent='center' textAlign='center'>
                <Typography fontFamily='revert' variant="h4" marginBottom={3}>¡Bienvenidos a FootballApp!</Typography>
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
                  type="submit" 
                  variant="contained" 
                  disabled= {status === 'checking' ? true : false}
                  >
                  Ingresar
                  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M480-120v-80h280v-560H480v-80h280q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H480Zm-80-160-55-58 102-102H120v-80h327L345-622l55-58 200 200-200 200Z"/></svg>
                </Button>
              </Grid2>

              <Grid2 size={20} marginTop={1} marginLeft={9}>
                <Button 
                  size="medium" 
                  type="submit" 
                  variant="contained" 
                  disabled= {status === 'checking' ? 'true' : ''}
                  onClick={startGoogleSignIn}
                  >
                  <svg xmlns="http://www.w3.org/2000/svg" width="25px" viewBox="0 0 50 50">
                  <path d="M 26 2 C 13.308594 2 3 12.308594 3 25 C 3 37.691406 13.308594 48 26 48 C 35.917969 48 41.972656 43.4375 45.125 37.78125 C 48.277344 32.125 48.675781 25.480469 47.71875 20.9375 L 47.53125 20.15625 L 46.75 20.15625 L 26 20.125 L 25 20.125 L 25 30.53125 L 36.4375 30.53125 C 34.710938 34.53125 31.195313 37.28125 26 37.28125 C 19.210938 37.28125 13.71875 31.789063 13.71875 25 C 13.71875 18.210938 19.210938 12.71875 26 12.71875 C 29.050781 12.71875 31.820313 13.847656 33.96875 15.6875 L 34.6875 16.28125 L 41.53125 9.4375 L 42.25 8.6875 L 41.5 8 C 37.414063 4.277344 31.960938 2 26 2 Z M 26 4 C 31.074219 4 35.652344 5.855469 39.28125 8.84375 L 34.46875 13.65625 C 32.089844 11.878906 29.199219 10.71875 26 10.71875 C 18.128906 10.71875 11.71875 17.128906 11.71875 25 C 11.71875 32.871094 18.128906 39.28125 26 39.28125 C 32.550781 39.28125 37.261719 35.265625 38.9375 29.8125 L 39.34375 28.53125 L 27 28.53125 L 27 22.125 L 45.84375 22.15625 C 46.507813 26.191406 46.066406 31.984375 43.375 36.8125 C 40.515625 41.9375 35.320313 46 26 46 C 14.386719 46 5 36.609375 5 25 C 5 13.390625 14.386719 4 26 4 Z"></path>
                  </svg>
                  Ingresar con Google
                </Button>
              </Grid2>

              <Grid2 size={20} marginTop={1} marginLeft={16}>
                <NavLink to="/auth/register">Crear una cuenta</NavLink>
              </Grid2>

            </form>         
            
        </Box>
    </>
  )
}
