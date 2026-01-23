import iconLogo from "~/assets/images/IconLogo.png"

export function Footer(){
    return (
        <div className="flex items-center justify-between text-[14px] bg-[#FFFFFF] h-[40px] fixed left-0 w-full px-[100px] max-[1100px]:px-[8px] bottom-0">
            <div>
                <p><span>©Sportsee</span> <span className="ml-[8px]">Tous droits réservés</span></p>
            </div>
            <div className="flex gap-[16px]">
                <ul className="flex gap-[16px]">
                    <li><a href="#">Conditions générales</a></li>
                    <li><a href="#">Contact</a></li>
                </ul>
                <div>
                    <img src={iconLogo} alt="" />
                </div>
            </div>
        </div>
    )
}