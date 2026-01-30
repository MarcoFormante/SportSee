import { useContext } from "react"
import { Navigate, NavLink } from "react-router"
import { useLogout } from "~/hooks/useLogout"
import { sessionExist, UserDataContext } from "~/providers/userProvider"

export function AdminHeader(){
    const userContext = useContext(UserDataContext)
    const token = sessionExist && sessionStorage.getItem("token")
    const logout = useLogout()

    return (
            (userContext?.token || token) ?
            <div className="flex nav-list-container h-full items-center">
                <ul className="flex">
                    <li>
                        <NavLink to={"/dashboard"} className={(path => path.isActive ? "text-[#0B23F4]" : "")}>Dashboard</NavLink>
                    </li>
                    <li>
                        <NavLink to={"/profile"} className={(path => path.isActive ? "text-[#0B23F4]" : "")}>Mon profil</NavLink>
                    </li>   
                </ul>
                <div>
                    <button onClick={()=>logout.fetch()} className="cursor-pointer text-[#0B23F4]">Se déconnecter</button>
                </div>
            </div>  
            :  (userContext?.token || !token) &&
                <Navigate to={"/"}/>
    )
}