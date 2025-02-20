import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { endLoginSuccess } from "../auth/helpers/authSlices"

export const useCheckAuth = () => {
    const status = useSelector(state => state.status)
    const dispatch = useDispatch()
  
    useEffect(() => {
        const loggedInUser = localStorage.getItem('user')
        if(loggedInUser){
          const foundUser = JSON.parse(loggedInUser)
          dispatch(endLoginSuccess(foundUser))
        }  
    }, [])

    return status
}