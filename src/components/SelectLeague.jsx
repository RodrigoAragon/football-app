import { Box, CircularProgress, FormControl, Grid2, InputLabel, MenuItem, Select} from "@mui/material"
import { useEffect, useState } from "react"
import { LeagueTable } from "./LeagueTable"
import {useSelector } from "react-redux"
import { getFavoriteTeam } from "../database/firestoreActions"
import { TeamBox } from "./TeamBox"
import { PickTeamBox } from "./PickTeamBox"
import { SignOutBox } from "./SignOutBox"


export const SelectLeague = () => {

    const [leagueId, setLeagueId] = useState(0)
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
            console.log(favTeam)
            setFavoriteTeam(favTeam)
            setFetchingTeam(false)
        } catch (error) {
            throw new Error(error)
        }
    }

    useEffect(() => {
      fetchFavoriteTeam()
    }, [])
    

  return (
    <>
        <Grid2 
            container
            direction={{xs:'column', sm:'column', md:'row', lg:'row'}}
            spacing={{xs: 10, sm: 6, md: 11, lg:35}}
            columns={{xs:1, sm:1, md:3, lg:3}}
        >
            <Grid2 item marginTop={{xs:4, sm:0, md:2, lg:2}} marginLeft={{xs:11, md:2, lg:4}}>
                <SignOutBox user={user}/>
            </Grid2>

            <Grid2 item marginTop={{xs:0, sm:2, md:2, lg:2}} marginLeft={{xs:5, md:5, lg:0}}>
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

            <Grid2 item marginTop={{xs:0,sm:2,md:2, lg:2}} marginLeft={{xs:11, sm:11, md:2, lg:5}}>
                {
                    fetchingTeam
                    ? <Box bgcolor='white' borderRadius={1} alignContent='center' textAlign='center' width={200} height={150}><CircularProgress /></Box>
                    : (favoriteTeam)? <TeamBox favoriteTeam={favoriteTeam}/> : <PickTeamBox/>
                }
            </Grid2>
            

        
        </Grid2>

        {
            leagueId === 0
            ? <></>
            : <LeagueTable leagueId={leagueId}/>
        }


    </>
  )
}
