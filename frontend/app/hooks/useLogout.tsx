import { useContext, useEffect, useState } from "react"
import { useFetch } from "./useFetch"
import { initialData, sessionExist, UserDataContext } from "~/providers/userProvider"
import { useNavigate } from "react-router"

export function useLogout(){
    const [canFetch,setCanFetch] = useState(false)
    const {status,setStatus,setData} = useFetch({method:"POST",url:"api/logout",canFetch:canFetch})
    const token = sessionExist && sessionStorage.getItem("token")
    const userContext = useContext(UserDataContext)
    const navigate = useNavigate()

    function fetch(){
        setCanFetch(true)
    }
    
    function resetAdmin(){
      userContext.setProfile({} as typeof initialData)
      userContext.setToken("")
      setStatus(0)
      setData({})
      sessionExist && sessionStorage.clear()
      setCanFetch(false) 
      navigate("/")     
    }
    
    
    useEffect(()=>{
            if (status === 200) {
                resetAdmin()
            }
    },[status,canFetch])
    
    
   

   
    return {fetch,resetAdmin}
}