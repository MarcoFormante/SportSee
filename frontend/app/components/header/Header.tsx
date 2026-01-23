import { NavLink, useLoaderData, useLocation, useNavigate } from "react-router";
import Logo from "../../assets/images/Logo.png";
import { useFetch } from "~/hooks/useFetch";
import { useContext, useEffect, useState } from "react";
import { initialData, sessionExist, UserDataContext } from "~/providers/userProvider";



export function Header(){
    const userContext = useContext(UserDataContext)
    const navigate = useNavigate()
    const [canFetch,setCanFetch] = useState(false)
    const {status,setStatus,setData} = useFetch({method:"POST",url:"api/logout",canFetch:canFetch})
    const token = sessionExist && sessionStorage.getItem("token")


    function logout(){
        setCanFetch(true)
    }

    useEffect(()=>{
        if (status === 200) {
            userContext.setProfile({} as typeof initialData)
            userContext.setToken("")
            setStatus(0)
            setData({})
            sessionExist && sessionStorage.clear()
            setCanFetch(false) 
            navigate("/")     
        }
    },[status,canFetch])

    
    return (
         <header className="mt-[35px] pl-[150px] pr-[150px] h-[49px] max-[1300px]:px-0">
            <nav className="flex justify-between items-center h-full">
                <div>
                    <NavLink to={"/profile"}>
                        <img src={Logo} alt="" />
                    </NavLink>
                </div>
                {
                    (userContext?.token || token) &&  

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
                            <button onClick={logout} className="cursor-pointer text-[#0B23F4]">Se déconnecter</button>
                        </div>
                    </div>  
                }
               
            </nav>
        </header>
    )
}