import { Navigate, NavLink, useLoaderData, useLocation, useNavigate } from "react-router";
import Logo from "../../assets/images/Logo.png";
import { useFetch } from "~/hooks/useFetch";
import { useContext, useEffect, useState } from "react";
import { initialData, sessionExist, UserDataContext } from "~/providers/userProvider";
import { useLogout } from "~/hooks/useLogout";
import { AdminHeader } from "./AdminHeader";



export function Header(){
    const token = sessionExist && sessionStorage.getItem("toksen")

    return (
         <header className="mt-[35px] pl-[150px] pr-[150px] h-[49px] max-[1300px]:px-0">
            <nav className="flex justify-between items-center h-full">
                <div>
                    <NavLink to={"/profile"}>
                        <img src={Logo} alt="" />
                    </NavLink>
                </div>
                <AdminHeader/>
            </nav>
        </header>
    )
}