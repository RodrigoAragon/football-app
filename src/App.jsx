import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import './App.css';
import { AuthRoutes } from "./router/AuthRoutes";
import { useCheckAuth } from "./hooks/useCheckAuth";
import { FootballRoutes } from "./router/FootballRoutes";

export const App = () => {
  const status = useCheckAuth()

  return (
      <BrowserRouter>
        <Routes>
            {
              (status === 'authenticated') 
              ? <Route path="/*" element={<FootballRoutes/>}/>
              : <Route path="/auth/*" element={<AuthRoutes/>}/>
            }
            <Route path='/*' element={<Navigate to='/auth/login'/>}/>
        </Routes>
      </BrowserRouter>
  )
}

