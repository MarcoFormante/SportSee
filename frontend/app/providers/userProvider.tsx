import { createContext, useEffect, useState} from "react";
import { useLocation } from "react-router";


export const sessionExist = typeof sessionStorage !== "undefined" 

export const initialData = {
        firstName: "",
        lastName: "",
        createdAt: "",
        age: 0,
        weight: 0,
        height: 0,
        profilePicture: "",
        gender:"",
        weeklyGoal:0,
        statistics: {
                totalDistance:"",
                totalSessions:"",
                totalDuration:0,
                totalBurnedCalories:""
            },
       
    }

    type Context = {
        profile:typeof initialData ,
        setProfile:React.Dispatch<React.SetStateAction<{
            firstName: string;
            lastName: string;
            createdAt: string;
            age: number;
            weight: number;
            height: number;
            profilePicture: string;
            gender:string;
            weeklyGoal:number,
            statistics: {
                totalDistance:string,
                totalSessions:string,
                totalDuration:number,
                totalBurnedCalories:string
            },
        }>>
        setToken:React.Dispatch<React.SetStateAction<string>>;
        token:string|null
    }

export const UserDataContext = createContext<Context>({
    profile:(sessionExist && sessionStorage.getItem("profile")) ? JSON.parse(sessionStorage.getItem("profile") ?? "") : initialData,
    setProfile: () => {},
    setToken: () => {},
    token:(sessionExist && sessionStorage.getItem("token")) ? sessionStorage.getItem("token") : ""
})


export function UserContext({children}:{children:React.ReactNode}){
    const [profile, setProfile] = useState({} as typeof initialData)
    const [token,setToken] = useState("")
    const {pathname} = useLocation()

    useEffect(()=>{
        if(sessionExist){
            if (token) {
                sessionStorage.setItem("token",token)
            }
            console.log(profile);
            
             if (!profile?.firstName && token && sessionStorage.getItem("profile")) {
                setProfile(JSON.parse(sessionStorage.getItem("profile") ?? ""))
                }else 
            if (profile?.firstName && !sessionStorage.getItem("profile") && token ) {
                sessionStorage.setItem("profile",JSON.stringify(profile))
            }
        }
    },[token,profile])

  

    return (
        <UserDataContext value={{profile,setProfile,token,setToken}}>
            {children}
        </UserDataContext>
    )
}