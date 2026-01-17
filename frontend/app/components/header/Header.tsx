import { NavLink } from "react-router";
import Logo from "../../assets/images/Logo.png";


export function Header(){
    return (
         <header className="mt-[35px] pl-[150px] pr-[150px] h-[49px]">
            <nav className="flex justify-between items-center h-full">
                <div>
                    <NavLink to={"/"}>
                        <img src={Logo} alt="" />
                    </NavLink>
                </div>
                <div className="flex nav-list-container h-full items-center">
                    <ul className="flex">
                        <li>
                            <NavLink to={"/dashboard"}>Dashboard</NavLink>
                        </li>
                        <li>
                            <NavLink to={"/profile"}>Mon profil</NavLink>
                        </li>   
                    </ul>
                    <div>
                        <button className="cursor-pointer">Se déconnecter</button>
                    </div>
                </div>  
            </nav>
        </header>
    )
}