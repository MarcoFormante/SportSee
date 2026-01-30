'use client'
import { useContext, useEffect, useState } from "react"
import { Navigate, useLoaderData, useNavigate} from "react-router"
import { sessionExist, UserDataContext } from "~/providers/userProvider"
import UserCard from "~/components/userProfile/UserCard"
import { PerformanceContainer } from '../components/performanceStat/PerformanceContainer';
import { PerformanceKm } from "~/components/performanceStat/PerformanceKm"
import { PerformanceBpm } from "~/components/performanceStat/PerformanceBpm"
import { ActivitySection } from "~/components/activityStats/ActivitySection"


export function DashboardPage(){
    const {token} = useLoaderData()
    const context = useContext(UserDataContext)
    const navigate = useNavigate()
    const [bpmWeek,setBpmWeek] = useState(7)
    const [kmMonth,setKmMonth] = useState(7 * 4)
    const [statContext,setStatContext] = useState("")
    
    const [bpmDates,setBpmDates] = useState({
        startDate: new Date( Date.now() - bpmWeek * 24 * 60 * 60 * 1000),
        endDate: new Date()
    })

    const [kmDates,setKmDates] = useState({
        startDate: new Date( Date.now() - kmMonth * 24 * 60 * 60 * 1000),
        endDate: new Date()
    })

    function getPrevious({context}:{context:string})
    {
        if (context === "bpm") {
            setBpmWeek(bpmWeek + 7)
            setStatContext("bpm")
        }else if(context === "km"){
            setKmMonth(kmMonth + (7 * 4))
            setStatContext("km")
        }
    }

    
    function getNext({context}:{context:string})
    {
         if (context === "bpm") {
            setBpmWeek(bpmWeek - 7)
            setStatContext("bpm")
        }else if(context === "km"){
            setKmMonth(kmMonth - (7 * 4))
            setStatContext("km")
        }
    }


    useEffect(()=>{
        if (statContext === "bpm") {
            setBpmDates({
                startDate: new Date( Date.now() - bpmWeek * 24 * 60 * 60 * 1000),
                endDate: new Date( Date.now() - (bpmWeek - 7)  * 24 * 60 * 60 * 1000)
            })
        }else if(statContext === "km"){
            setKmDates({
                startDate: new Date( Date.now() - kmMonth * 24 * 60 * 60 * 1000),
                endDate: new Date( Date.now() - (kmMonth - (7 * 4))  * 24 * 60 * 60 * 1000)
            })
        }
        
    },[statContext,bpmWeek,kmMonth])

    useEffect(()=>{
        if (!token) {
            navigate("/")
        }
    },[token])
    
    const sessionProfile = (sessionExist && sessionStorage?.getItem("profile")) &&  JSON.parse(sessionStorage?.getItem("profile") ?? "")
    

    return token ?(    
        <main className="pl-[150px] pr-[150px] max-[1300px]:px-[0px] pt-[108px] pb-[80px]">
            <div className="max-w-[1052px] m-auto">
                <section aria-label="informations de l'utilisateur ">
                    <div>
                        <div className="w-full h-[165px] rounded-[10px] bg-[#FFFFFF] flex items-center justify-between pr-[52px]">
                            <UserCard
                                firstname={sessionProfile?.firstName || context.profile?.firstName  } 
                                lastName={sessionProfile?.lastName || context.profile?.lastName}
                                createdAt={sessionProfile?.createdAt || context.profile?.createdAt}
                                image={sessionProfile?.profilePicture || context.profile?.profilePicture}
                            />

                            <div className="flex items-center gap-[18px] ">
                                <p className="text-[#707070] text-[14px]">Distance totale parcourue</p>
                                <div className="w-[183px]">
                                    <div className={`bg-[#0B23F4] rounded-[10px] flex flex-col justify-center items-center  h-[90px] w-[183px] max-[1200px]:w-[19vw]  max-[1300px]:pl-[10px]  max-[1300px]:pr-[2px]`}>
                                        <div className=" gap-[19px] justify-center">
                                            <div className={`flex gap-1 items-center justify-center items-center`}>
                                                <p className="text-[22px] text-[#FFFFFF] h-full">{sessionProfile?.statistics?.totalDistance || context?.profile?.statistics?.totalDistance} </p> <span className="text-[#B6BDFC]">Km</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
               
                <section className="pt-[108px]">
                    <div className="mb-[32px]">
                        <h1 className="font-normal text-[22px]">Vos dernières performances</h1>
                    </div>
                    <div className="h-[484px] flex gap-[24px]">
                        
                            <div className="w-[445px] h-full ">
                                <PerformanceContainer>
                                        <PerformanceKm
                                        context="km" 
                                        token={token} 
                                        color={"#F4320B"} 
                                        hasButtons 
                                        getPrevious={({context})=>getPrevious({context})} 
                                        getNext={({context})=>getNext({context})} 
                                        startDate={kmDates.startDate} 
                                        endDate={kmDates.endDate} 
                                        desc="Total des kilomètres 4 dernières semaines"
                                    />
                                  
                                </PerformanceContainer>
                            </div>

                            <div className="w-[583px] h-full">
                                <PerformanceContainer>
                                <PerformanceBpm token={token} />
                                </PerformanceContainer>
                            </div>
                    </div>
                </section>

               <ActivitySection token={token} startDate={bpmDates.startDate} endDate={bpmDates.endDate}/>

            </div>
        </main> 
    ):<Navigate to={"/"}/>
}

   