import { sessionExist } from "~/providers/userProvider"
import { formatDate } from "~/utils/utils"

type UserProfile = {
    firstname:string,
    lastName: string,
    createdAt: string,
    image:string
}

export default function UserCard({firstname,lastName,createdAt,image}:UserProfile){
    return (    
        <div className="flex items-center gap-[24px] pl-[32px] ">
            <div className="w-[104px] h-[117px]">
                <img className="w-full h-full object-fill aspect-square rounded-[10px]" src={image} alt="" />
            </div>
            <div>
                <p className="text-[22px] font-medium">{firstname} {lastName}</p>
                <p className="text-[14px] text-[#707070]">Membre depuis le {formatDate(createdAt)}</p>
            </div>
        </div>
    )
}