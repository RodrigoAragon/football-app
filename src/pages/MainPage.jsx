import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Box, CircularProgress, Divider, Drawer, Grid2 } from "@mui/material"
import { SignOutBox } from "../components/SignOutBox"
import { TeamBox } from "../components/TeamBox"
import { PickTeamBox } from "../components/PickTeamBox"
import { deleteFavoriteTeam, getFavoriteTeam } from "../database/firestoreActions"
import { SelectLeague } from "../components/SelectLeague"

export const MainPage = () => {

    const [favoriteTeam, setFavoriteTeam] = useState()
    const [fetchingTeam, setFetchingTeam] = useState(false)
    const {user} = useSelector(state => state)


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


    useEffect(() => {
        fetchFavoriteTeam()
      }, [])
      

  return (

    <>
        <Drawer
            sx={{
                width: 240,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                bgcolor: 'darkgrey',
                width: 240,
                boxSizing: 'border-box',
                },
            }}
            variant="permanent"
            anchor="left"
            alignContent='center' 
            
        >

            <Grid2 textAlign='center' marginLeft={2.5} marginTop={2}>
                    <SignOutBox user={user}/>
            </Grid2>

            <Divider sx={{color: 'black', mt:1}}/>

            <Grid2 textAlign='center' sx={{mt:1, ml:2.5}}>
                    {
                        fetchingTeam
                        ? <Box bgcolor='white' borderRadius={1} alignContent='center' textAlign='center' width={200} height={150}><CircularProgress /></Box>
                        : (favoriteTeam)? <TeamBox favoriteTeam={favoriteTeam} deleteTeam={deleteTeam}/> : <PickTeamBox/>
                    }
            </Grid2>
        </Drawer>
        
        <SelectLeague/>

    </>
    


  )
}
