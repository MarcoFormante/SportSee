import { useFetch } from "~/hooks/useFetch";
import { PerformanceContainer } from "../performanceStat/PerformanceContainer";
import { useContext, useEffect, useState } from "react";
import { initialData, sessionExist, UserDataContext } from "~/providers/userProvider";
import { Circle } from "./Circle";

export function ActivitySection({token,startDate,endDate}:{token:string,startDate:Date,endDate:Date}){
    const [canFetch,setCanFetch] = useState(false)
    const [totalDuration,setTotalDuration] = useState(0)
    const [totalDistance,setTotalDistance] = useState(0)
    const context = useContext(UserDataContext)

    const {data} = useFetch({
           method:"GET",
           url:`api/user-activity?startWeek=${startDate?.toISOString().split("T")[0].replaceAll("/","-")}&endWeek=${endDate?.toISOString().split("T")[0].replaceAll("/","-").replaceAll("/","-")}`,
           token,
           body:{},
           canFetch:canFetch
       })

       useEffect(()=>{
        if (token) {
            setCanFetch(true)
        }
       },[token])

       useEffect(()=>{
        if (data) {
            let minutes = 0
            let distance = 0
            data.forEach((d:any)=> {
                minutes += d.duration
                distance += d.distance
            })
            setTotalDuration(minutes)
            setTotalDistance(distance)
        }
       },[data])

    const sessionProfile:typeof initialData = (sessionExist && sessionStorage?.getItem("profile")) &&  JSON.parse(sessionStorage?.getItem("profile") ?? "")

    return (
         <section className="pt-[108px]">
                    <div className="mb-[32px]">
                        <h2 className="font-normal text-[22px]">Cette semaine</h2>
                        <p className="text-[#707070] font-medium">Du {`${startDate.toLocaleDateString("fr-FR")}`} au {`${endDate.toLocaleDateString("fr-FR")}`}</p>
                    </div>

                    <div className="h-[342px] flex gap-[24px]">
                        <div className="w-[445px] h-full">
                            <PerformanceContainer>
                             <div className="pl-[38px] pt-[16px] max-[1170px]:px-[8px]">
                                <p className="text-[#B6BDFC] flex items-center gap-[5px]"><span className="text-[#0B23F4] font-semibold text-[28px]">X{context.profile.weeklyGoal  || sessionProfile?.weeklyGoal}</span> sur objectif de 6</p>
                                <div>
                                    <p className="text-[#707070] text-[14px]">Courses hebdomadaire réalisées</p>
                                </div>
                            </div>

                            <div className=" flex justify-center pt-[50px]">
                                <div className="w-[306px] relative">
                                    <span className="absolute right-10 top-9 text-[10px] flex items-center gap-1 text-[#707070]"> <span className="block w-2 h-2 bg-[#B6BDFC] rounded-full"></span> {6 - (context.profile.weeklyGoal || sessionProfile?.weeklyGoal)} restants</span>
                                    <span className="absolute left-8 bottom-9 text-[10px] flex items-center gap-1 text-[#707070]"> <span className="block w-2 h-2 bg-[#0B23F4] rounded-full"></span> {context.profile.weeklyGoal || sessionProfile?.weeklyGoal} réalisées</span>
                                    <Circle weeklyGoal={context.profile.weeklyGoal || sessionProfile?.weeklyGoal }/>
                                </div>
                            </div>
                            </PerformanceContainer>
                        </div>
                        <div>
                            <div className="flex flex-col gap-[16px]">
                                <div className="w-[583px] h-[103px]">
                                    <PerformanceContainer>
                                         <div className="pl-[30px] pt-[20px] flex flex-col gap-[14px] pb-[20px]">
                                            <p className="text-[14px] text-[#707070]">Durée d’activité</p>
                                            <div>
                                                <p className="text-[#0B23F4] text-[22px]">{totalDuration} <span className="text-[#B6BDFC] text-[16px]">minutes</span></p>
                                            </div>
                                        </div>
                                    </PerformanceContainer>
                                </div>

                                <div className="w-[583px] h-[103px]">
                                    <PerformanceContainer>
                                         <div className="pl-[30px] pt-[20px] flex flex-col gap-[14px] pb-[20px]">
                                            <p className="text-[14px] text-[#707070]">Distance</p>
                                            <div>
                                                <p className="text-[#F4320B] text-[22px]">{totalDistance} <span className="text-[16px] text-[#FCC1B6]">kilomètres</span></p>
                                            </div>
                                        </div>
                                    </PerformanceContainer>
                                </div>
                            </div>
                        </div>
                    </div>
        </section>
    )
}