import { useEffect, useState } from "react"
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from "recharts"
import { useFetch } from "~/hooks/useFetch"
import { Performance } from "./Performance"
import { Loading } from "../loading/Loading"



export function PerformanceKm({startDate, endDate,token,getPrevious,getNext}:{token?:string,context?:string,color:string,hasButtons?:boolean,startDate?:Date, endDate?:Date,desc:string,getPrevious:({context}:{context:string})=>void,getNext:({context}:{context:string})=>void}){
    const [title,setTitle] = useState("")
    const [canFetch,setCanFetch] = useState(false)
    const [graphKm,setGraphKm] = useState<Array<{name:string,km:number}>>([])
    

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

    const calculateMonthKms = ()=>{
        const firstWeek = new Date(startDate ?? "");
        const endFirstWeekDate = new Date(firstWeek)
        const endFirstWeek  = new Date(endFirstWeekDate.setDate(firstWeek.getDate() + 7))
        const sessionsFirstWeek = data?.filter((session:any)=>{
            const sessionDate = new Date(session.date)
            if (startDate && endFirstWeek) {
                return sessionDate >= startDate && sessionDate <= endFirstWeek
            }
        })

        const secondWeek = new Date(endFirstWeekDate)
        const endSecondWeekDate= new Date(secondWeek)
        const endSecondWeek = new Date(endSecondWeekDate.setDate(secondWeek.getDate() + 7))

        const sessionsSecondWeek = data?.filter((session:any)=>{
            const sessionDate = new Date(session.date)
            if (secondWeek && endSecondWeek) {
                return sessionDate >= secondWeek && sessionDate <= endSecondWeek
            }
        })

        const thirdWeek = new Date(endSecondWeekDate)
        const endThirdWeekDate= new Date(thirdWeek)
        const endThirdWeek = new Date(endThirdWeekDate.setDate(thirdWeek.getDate() + 7))

        const sessionsThirdWeek = data?.filter((session:any)=>{
            const sessionDate = new Date(session.date)
            if (thirdWeek && endThirdWeek) {
                return sessionDate >= thirdWeek && sessionDate <= endThirdWeek
            }
        })

        const fourthWeek = new Date(endThirdWeekDate)
        const endFourthWeekDate= new Date(fourthWeek)
        const endFourthWeek = new Date(endFourthWeekDate.setDate(fourthWeek.getDate() + 7))

        const sessionsFourthWeek = data?.filter((session:any)=>{
            const sessionDate = new Date(session.date)
            if (fourthWeek && endFourthWeek) {
                return sessionDate >= fourthWeek && sessionDate <= endFourthWeek
            }
        })

       const totalS1:any = []
       const totalS2:any = []
       const totalS3:any = []
       const totalS4:any = []
        
        sessionsFirstWeek?.forEach((s:any) => totalS1.push(s.distance))
        sessionsSecondWeek?.forEach((s:any) => totalS2.push(s.distance))
        sessionsThirdWeek?.forEach((s:any) => totalS3.push(s.distance))
        sessionsFourthWeek?.forEach((s:any) => totalS4.push(s.distance))
    
        const distances = [
            totalS1?.length && totalS1?.reduce((a:number,b:number)=> a + b),
            totalS2?.length && totalS2.reduce((a:number,b:number)=> a + b),
            totalS3?.length  && totalS3.reduce((a:number,b:number)=> a + b),
            totalS4?.length && totalS4.reduce((a:number,b:number)=> a + b)
        ]

        const averageS1 =  sessionsFirstWeek?.length ?   distances[0] / sessionsFirstWeek?.length : 0
        const averageS2 =  sessionsSecondWeek?.length ?  distances[1] / sessionsSecondWeek?.length : 0
        const averageS3 =  sessionsThirdWeek?.length ?  distances[2] / sessionsThirdWeek?.length : 0
        const averageS4 =  sessionsFourthWeek?.length ?  distances[3] / sessionsFourthWeek?.length : 0

        const reduced = Math.round([averageS1,averageS2,averageS3,averageS4].reduce((sum,s) => sum + s)) 
        
        setTitle((reduced ? reduced  : 0)  + "Km en moyenne")

        const graph:Array<{name:string,km:number}> = []

        distances.forEach((d,i)=> {
            graph.push({name:"S" + (i + 1),km:d})
        })

        setGraphKm(graph)
    }
    
   useEffect(()=>{
        calculateMonthKms()
   },[data])
  
    

    return canFetch && graphKm ? (
        <Performance 
            hasButtons={true} 
            title={title}
            getNext={getNext} 
            getPrevious={getPrevious} 
            context="km"
            desc="Total des kilomètres 4 dernières semaines"
            startDate={new Date(startDate ?? "")} 
            endDate={new Date(endDate ?? "")} 
            color="#0B23F4"
          >
            <BarChart width={330} height={307} data={graphKm} responsive margin={{bottom:20,left:20}} >
                <XAxis dataKey="name" stroke="#707070" width={330} padding={{left:0,right:10}} tickCount={4} tickSize={25} tickLine={false} fontSize={12} />
                <YAxis tickCount={4} width={16} fontSize={10} tickLine={false}/>
                <CartesianGrid strokeDasharray={"3 3 "}  />
                <Bar dataKey="km" fill="#B6BDFC" barSize={14} radius={30}  />
            </BarChart>
         </Performance>
    ): 
   <Loading/>
}