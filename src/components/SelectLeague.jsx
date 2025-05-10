import { AppBar, Box, Button, CircularProgress, FormControl, Grid2, InputLabel, MenuItem, Select, Toolbar, Typography} from "@mui/material"
import { useEffect, useState } from "react"
import { LeagueTable } from "./LeagueTable"
import {useDispatch, useSelector } from "react-redux"
import { deleteFavoriteTeam, getFavoriteTeam } from "../database/firestoreActions"
import { TeamBox } from "./TeamBox"
import { PickTeamBox } from "./PickTeamBox"
import { endSignOut, startSignOut } from "../auth/helpers/authSlices"
import { accountSignOut } from "../auth/helpers/authActions"


export const SelectLeague = () => {

    const [leagueId, setLeagueId] = useState('')
    const [favoriteTeam, setFavoriteTeam] = useState()
    const [fetchingTeam, setFetchingTeam] = useState(false)
    const {user} = useSelector(state => state)

    const handleChange = ({target}) =>{
        setLeagueId(target.value)
    }

    const fetchFavoriteTeam = async() =>{
        try {
            setFetchingTeam(true)
            const favTeam = await getFavoriteTeam(user)
            setFavoriteTeam(favTeam)
            setFetchingTeam(false)
        } catch (error) {
            throw new Error(error)
        }
    }

    const deleteTeam = async() =>{
        try {
          await deleteFavoriteTeam(favoriteTeam.team.id)
          setFavoriteTeam()
        } catch (error) {
          throw new Error(error)
        }
      }

    const dispatch = useDispatch()
      
    const handleSignOut = async () =>{
        try {
            dispatch(startSignOut())
            await accountSignOut()
            dispatch(endSignOut())
            localStorage.clear()
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
      fetchFavoriteTeam()
    }, [])
    

  return (
    <>
        <Box sx={{flexGrow:1}}>
            <AppBar position="static" color="primary" sx={{bgcolor:'white', color:'black'}}>
                <Toolbar>
                    <Grid2 
                        container
                        direction={{xs:'column', sm:'column', md:'row', lg:'row'}}
                        spacing={{xs: 10, sm: 6, md: 11, lg:35}}
                        columns={{xs:1, sm:1, md:3, lg:3}}
                        >

                        <Box sx={{marginTop:1, marginBottom:1}}>
                            {
                                user.displayName
                                ? <Typography alignContent="center"textAlign="center"> Bienvenido, {user.displayName}</Typography>
                                : <></>
                            }

                            <Button 
                                variant="contained" 
                                onClick={() => handleSignOut()}
                                color="error"
                                sx={{marginLeft:5}}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z"/></svg>
                                Cerrar sesión
                            </Button>
                        </Box>
                        

                        <Grid2>
                            {
                                fetchingTeam
                                ? <Box sx={{            
                                    width: 200,
                                    borderRadius:1,
                                    alignContent: 'center',
                                    textAlign: 'center',
                                    marginLeft:65,
                                    marginTop:1
                                }}
                                    >
                                        <CircularProgress />
                                    </Box>
                                : (favoriteTeam)? <TeamBox favoriteTeam={favoriteTeam} deleteTeam={deleteTeam}/> : <PickTeamBox/>
                            }
                        </Grid2>
                    </Grid2>
                </Toolbar>
            </AppBar>
        </Box>
        <Grid2 item marginTop={{xs:0, sm:2, md:2, lg:2}} marginLeft={{xs:5, md:65}}>
            <Box
                sx={{
                    bgcolor: 'white',
                    textAlign: 'center',
                    width: 300,
                    height: 100,
                    borderRadius: 1
                }}
                >
                <FormControl variant="outlined" sx={{m:3, width:200}}>
                    <InputLabel>Seleccionar liga</InputLabel>
                    <Select 
                        label="Seleccionar liga" 
                        value={leagueId}
                        onChange={handleChange}
                        >
                        <MenuItem value={39}> Premier League</MenuItem>
                        <MenuItem value={140}> La Liga</MenuItem>
                        <MenuItem value={78}> Bundesliga</MenuItem>
                        <MenuItem value={135}> Serie A</MenuItem>
                        <MenuItem value={61}> Ligue 1</MenuItem>
                        <MenuItem value={128}>Liga Profesional Argentina</MenuItem>
                        <MenuItem value={129}>Primera Nacional</MenuItem>
                        <MenuItem value={131}>Primera B Metropolitana</MenuItem>
                        <MenuItem value={132}>Primera C</MenuItem>
                        <MenuItem value={71}>Brasileirao</MenuItem>
                        <MenuItem value={268}>Campeonato Uruguayo Apertura</MenuItem>
                        <MenuItem value={270}>Campeonato Uruguayo Clausura</MenuItem>
                    </Select>
                </FormControl>
            </Box>
        </Grid2>

        {
            leagueId === ''
            ? <></>
            : <LeagueTable leagueId={leagueId}/>
        }


    </>
  )
}
