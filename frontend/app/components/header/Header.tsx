import {  NavLink }  from "react-router";
import Logo from "../../assets/images/Logo.png";
import { sessionExist,  } from "~/providers/userProvider";

import { AdminHeader } from "./AdminHeader";



export function Header(){

    return (
         <header className="mt-[35px] max-w-[1140px] m-auto h-[49px] max-[1300px]:px-0">
            <nav className="flex justify-between items-center h-full">
                <div>
                    <NavLink to={"/profile"}>
                        <img src={Logo} alt="SportSee" />
                    </NavLink>
                </div>
                <AdminHeader/>
            </nav>
        </header>
    )
}