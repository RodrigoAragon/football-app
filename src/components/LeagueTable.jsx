import { useEffect, useState } from "react";
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { getStandings } from "../helpers/footballApi";
import { LoadingPage } from "./LoadingPage";

export const LeagueTable = ({leagueId}) => {
  
  const [leagueInfo, setLeagueInfo] = useState({})
  const [teams, setTeams] = useState([])
  const [isLoading, setLoading] = useState(false)
  
  const fetchStandings = async() =>{
    try {
      setLoading(true)
      const resp = await getStandings(leagueId)
      setLeagueInfo(resp[0].league)
      setTeams(resp[0].league.standings[0])
      setLoading(false)
    } catch (error) {
      throw new Error(error);
    }
  }

  useEffect(() => {
    fetchStandings()
  }, [leagueId])
  

  return (
    <>
      {
        (teams.length === 0 || isLoading)
        ? <LoadingPage/>
        : <>
              <Box
                sx={{
                  bgcolor: "white",
                  alignContent: "center",
                  textAlign: 'center',
                  width: 400,
                  height: 80,
                  borderRadius: 1,
                  mt: 4,
                  ml: 50,
                  mx: 'auto'
                }}
              >
                <img 
                  height= "80px"
                  width="80px"
                  src={`https://media.api-sports.io/football/leagues/${leagueId}.png`}
                />
                {leagueInfo.name}
              </Box>

              <TableContainer>
                <Table
                    sx={{
                      bgcolor:'white',
                      width:800,
                      height:400,
                      mt: 4,
                      mb: 1,
                      mx:'auto'
                    }}
                  >

                    <TableHead sx={{bgcolor:'darkmagenta'}}>          
                      <TableRow>
                        <TableCell> # </TableCell>
                        <TableCell> Team </TableCell>
                        <TableCell> Pts </TableCell>
                        <TableCell> GP </TableCell>
                        <TableCell> GW </TableCell>
                        <TableCell> GD </TableCell>
                        <TableCell> GL </TableCell>
                        <TableCell> GF </TableCell>
                        <TableCell> GC </TableCell>
                        <TableCell> DIF </TableCell>
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {teams.map((team) => (
                          <TableRow key={team.team.id} 
                              sx={{
                                bgcolor: 
                                  (team.description && team.description.includes('Relegation')) 
                                  ? 'lightcoral' 
                                  : (team.description && team.description.includes('Champions')) 
                                  ? 'lightblue'
                                  : (team.description && team.description.includes('Europa League'))
                                  ? 'lightsalmon'
                                  : (team.description && team.description.includes('Conference'))
                                  ? 'lightgreen'
                                  : (team.rank === 1)
                                  ? 'gold'
                                  : 'white'
                              }}
                          >
                            <TableCell className="menuitem">{team.rank}</TableCell>
                            <TableCell className="menuitem"> <img width="30px" height="30px" src={`https://media.api-sports.io/football/teams/${team.team.id}.png`}/> {team.team.name}</TableCell>
                            <TableCell className="menuitem">{team.points}</TableCell>
                            <TableCell className="menuitem">{team.all.played}</TableCell>
                            <TableCell className="menuitem">{team.all.win}</TableCell>
                            <TableCell className="menuitem">{team.all.draw}</TableCell>
                            <TableCell className="menuitem">{team.all.lose}</TableCell>
                            <TableCell className="menuitem">{team.all.goals.for}</TableCell>
                            <TableCell className="menuitem">{team.all.goals.against}</TableCell>
                            <TableCell className="menuitem">{team.goalsDiff}</TableCell>
                          </TableRow>
                        ))
                      }
                    </TableBody>

                  </Table>
              </TableContainer>
          </>
      }

    </>
  );
};


LeagueTable.propTypes ={
  leagueId: Number
}