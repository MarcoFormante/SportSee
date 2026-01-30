import { useContext, useEffect, useState } from "react"
import { Navigate, useLoaderData, useNavigate } from "react-router"
import { Loading } from "~/components/loading/Loading"
import { StatisticCard } from "~/components/statisticCard/StatisticCard"
import UserCard from "~/components/userProfile/UserCard"
import { useFetch } from "~/hooks/useFetch"
import { UserDataContext } from "~/providers/userProvider"
import { formatDate } from "~/utils/utils"

export function ProfilePage() {
  const {token} = useLoaderData()
  const context = useContext(UserDataContext)
  const [canFetch,setCanFetch] = useState(false);
  const navigate = useNavigate()
  const { data } = useFetch({method: "GET", url: "api/user-info",token,canFetch:canFetch})
  
 useEffect(() => {
        if(!token){
            navigate("/")
        }
        if (data) {
            context.setProfile({...data.profile,statistics:data.statistics})
        }
    }, [canFetch,data,token])

    useEffect(()=>{ 
        if (!context.profile.firstName && token) {
            setCanFetch(true)
        }
    },[token,context])


  return token ?(
    <main className="pt-[108px]">
     { data || context ?  <div className="flex gap-[57px] max-[1100px]:gap-[15px]">
        <div className="ml-[150px] w-[508px] max-[1300px]:m-[0]">
          <div>
              <div className="w-full h-[165px] rounded-[10px] bg-[#FFFFFF] flex items-center">
                <UserCard
                  firstname={context.profile?.firstName} 
                  lastName={context.profile?.lastName}
                  createdAt={context.profile?.createdAt}
                  image={context.profile?.profilePicture}
                />
            </div>
          </div>

          <div className="pl-[28px] pt-[40px] h-[331px] pr-[24px] mt-[16px] bg-[#FFFFFF] rounded-[10px]">
            <h1 className="pb-[24px] text-[22px] font-medium">Votre profil</h1>
            <hr className="text-[#E7E7E7]"/>
            <div className="flex flex-col gap-[24px] mt-[32px] text-[#707070] font-medium">
              <p>Âge : {context.profile?.age}</p>
              <p>Genre : {context.profile?.gender === "female" ? "Femme" : "Homme"}</p>
              <p>Taille : {(context.profile?.height / 100).toString().replace(".","m")}</p>
              <p>Poids : {context.profile?.weight}kg</p>
            </div>
          </div>
        </div>

        <div>
            <div>
              <h2 className="text-[22px] font-medium">Vos statistiques</h2>
              <p className="text-[14px] text-[#707070]">depuis le {formatDate(context.profile?.createdAt)}</p>
            </div>
            <div className="grid grid-cols-2 gap-[19px] text-white mt-[32px]  ">
              {context.profile?.statistics  ? 
              <>
                <StatisticCard title={"Temps total couru"} statistic={(context.profile?.statistics?.totalDuration / (60 )).toFixed(0) + "h"} context={(context.profile?.statistics?.totalDuration - 100 / (60)).toFixed(2).toString().split(".")[1]+"min"}/>
                <StatisticCard title={"Calories brûlées"} statistic={context.profile?.statistics?.totalBurnedCalories} context={"cal"}/>
                <StatisticCard title={"Distance totale parcourue"} statistic={context.profile?.statistics?.totalDistance} context={"km"}/>
                <StatisticCard title={"Nombre de jours de repos"} statistic={"9"} context={"jours"}/>
                <StatisticCard title={"Nombre de sessions"}  statistic={context.profile?.statistics?.totalSessions} context={"session"}/>           
              </>
             
              :  
              <div className="statisticCards-loading">
                  <Loading/>
              </div>
             
              }
              
            </div>
        </div>
      </div>
      : <Loading/>  
    }
    </main>
  ):<Navigate to={"/"}/>
}

