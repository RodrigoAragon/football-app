import { Navigate, Route, Routes } from 'react-router'
import { SelectLeague } from '../components/SelectLeague'
import { SelectClub } from '../components/SelectClub'

export const FootballRoutes = () => {
    return (
        <Routes>
            <Route path="/home" element={<SelectLeague/>}/>
            <Route path="/select-club" element={<SelectClub/>}/>
    
            <Route path="/*" element={<Navigate to={"/home"}/>}/>
        </Routes>
      )
}
