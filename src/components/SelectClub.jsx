import { Box, Button, CircularProgress, FormControl, Grid2, InputLabel, MenuItem, Select } from "@mui/material"
import { useEffect, useState } from "react"
import { getStandings } from "../assets/footballAPI/footballApi"
import { useSelector } from "react-redux"
import { setFavoriteTeam } from "../database/firestoreActions"
import { useNavigate } from "react-router"

export const SelectClub = () => {

  const [leagueId, setLeagueId] = useState(0)
  const [teams, setTeams] = useState([])
  const [team, setTeam] = useState(null)
  const [isLoading, setLoading] = useState(false)
  const [isUploading, setUploading] = useState(false)
  const {user} = useSelector(state => state)

  const navigate = useNavigate()

  const fetchTeams = async() =>{
    if(leagueId === 0)
      return
    try {
      setLoading(true)
      const resp = await getStandings(leagueId)
      setLoading(false)
      setTeams(resp[0].league.standings[0])
    } catch (error) {
      console.log(error)
    }
  }

  const handleChangeLeague = ({target}) =>{
    setLeagueId(target.value)
  }

  const handleChangeTeam = ({target}) =>{
    setTeam(target.value)
  }

  const handleClick = async() =>{
    try {
      setUploading(true);
      await setFavoriteTeam(user, team);
      setUploading(false);
      navigate("/home")
    } catch (error) {
      console.log(error)
    }
    
  }

  useEffect(() => {
    fetchTeams()
  }, [leagueId])
  

  return (
    <Box
      sx={{
        backgroundColor:'white',
        width:500,
        height:300,
        borderRadius:1,
        alignContent: 'center',
        textAlign: 'center',
        mt: 15,
        mx: 'auto',
      }}
    >
      <Grid2 container >
        <Grid2 item size={20}>
          <FormControl variant="filled" sx={{minWidth:150}}>
            <InputLabel>Liga</InputLabel>
            <Select label="Selecciona liga" value={leagueId} onChange={(event) => handleChangeLeague(event)}>
              <MenuItem value={39}> Premier League</MenuItem>
              <MenuItem value={140}> La Liga</MenuItem>
              <MenuItem value={78}> Bundesliga</MenuItem>
              <MenuItem value={135}> Serie A</MenuItem>
              <MenuItem value={61}> Ligue 1</MenuItem>
              <MenuItem value={128}>Liga Profesional Argentina</MenuItem>
            </Select>
          </FormControl>
      </Grid2>
        
      <Grid2 item size={20} margin={1}>
        {
            isLoading
            ? <CircularProgress/>
            :<>
              <FormControl variant="filled" sx={{minWidth:150}} hidden={teams.length===0? 'true': ''}>
                <InputLabel>Club</InputLabel>
                <Select value={team} onChange={(event) => handleChangeTeam(event)}>
                  {
                    teams.map((team) => (
                      <MenuItem key={team.team.id} value={team.team}><img width="30px" height="30px" src={`https://media.api-sports.io/football/teams/${team.team.id}.png`}/>{team.team.name}</MenuItem>
                    ))
                  }
                </Select>
              </FormControl>
            </>
            
        }
      </Grid2>
        
      
      <Grid2 item size={20}>
        <Button variant="contained" 
            onClick={handleClick} 
            disabled={isLoading || isUploading || team === null? 'true': ''}
            sx={{padding:2}}        
          >
            Confirmar Club
        </Button>
      </Grid2>

    </Grid2>
    </Box>
  )
}
