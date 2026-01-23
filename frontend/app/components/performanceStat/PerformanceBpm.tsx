import { useEffect, useState } from "react"
import { Bar, BarChart, CartesianGrid, ComposedChart, Legend, Line, Tooltip, XAxis, YAxis } from "recharts"
import { useFetch } from "~/hooks/useFetch"
import { Performance } from "./Performance"
import { Loading } from "../loading/Loading"

export function PerformanceBpm({token}:{token?:string}){
    const [title,setTitle] = useState("0 BPM")
    const [canFetch,setCanFetch] = useState(false)
    const [graphBpm,setGraphBpm] = useState<Array<{name:string,min:number,max:number,day:string,average:number}>>([])
    const day = new Date().getDay() || 7
    const startDay = new Date()
    const bpmWeek = 7

    const [bpmDates,setBpmDates] = useState({
        startDate: day !== 1 ? new Date(startDay.setHours(-24 * (day - 1))) : startDay,
        endDate: day !== 7 ? new Date(new Date().setHours(-24 * (day - 7))) : new Date()
    })

    const {data} = useFetch({
        method:"GET",
        url:`api/user-activity?startWeek=${bpmDates.startDate?.toISOString().split("T")[0].replaceAll("/","-")}&endWeek=${bpmDates.endDate?.toISOString().split("T")[0].replaceAll("/","-").replaceAll("/","-")}`,
        token,
        body:{},
        canFetch:canFetch
    })

    useEffect(()=>{
        if (token) {
            setCanFetch(true)
        }
    },[token])


  function getPrevious()
    {
        const start =  new Date(bpmDates.startDate)
        const end = new Date(bpmDates.endDate)
        
         setBpmDates({
            startDate: new Date(start.setDate((bpmDates.startDate.getDate() - bpmWeek))),
            endDate: new Date(end.setDate((bpmDates.endDate.getDate() - bpmWeek)))
        })
        
    }

     function getNext()
    {
        const start =  new Date(bpmDates.startDate)
        const end = new Date(bpmDates.endDate)
        
        setBpmDates({
            startDate: new Date(start.setDate((bpmDates.startDate.getDate() + (bpmWeek)))),
            endDate: new Date(end.setDate((bpmDates.endDate.getDate() + (bpmWeek))))
        })
    }


    const calculateBpm = ()=>{
        if (!data) {
            return 
        }
        const days = ["Lun","Mar","Mer","Jeu","Ven","Sam","Dim"]

        const week = days.map(day => ({
            name: "bpm",
            min: 0,
            max: 0,
            day,
            average: 0
        }))

        const normalizeDay = (date: Date) => {
            const d = date.getDay()
            return d === 0 ? 6 : d - 1
        }

        const grouped: Record<number, {
            min: number[]
            max: number[]
            avg: number[]
        }> = {}

        data.forEach((session: any) => {
            if (!session.heartRate) return

            const date = new Date(session.date + "T00:00:00")
            const dayIndex = normalizeDay(date)

            if (!grouped[dayIndex]) {
            grouped[dayIndex] = { min: [], max: [], avg: [] }
            }

            grouped[dayIndex].min.push(session.heartRate.min)
            grouped[dayIndex].max.push(session.heartRate.max)
            grouped[dayIndex].avg.push(session.heartRate.average)
        })

        let totalAverage = 0

        Object.keys(grouped).forEach(key => {
            const i = Number(key)
            const group = grouped[i]

            const min = Math.min(...group.min)
            const max = Math.max(...group.max)
            const average = Math.round(group.avg.reduce((a, b) => a + b, 0) / group.avg.length )

            totalAverage += average

            week[i] = {
            ...week[i],
            min,
            max,
            average
            }
        
        })
        
        setGraphBpm(week)
        setTitle((data?.length ? Math.round((totalAverage / (data?.length))) : 0) + " BPM")
    }

    useEffect(()=>{
        calculateBpm()
    },[data])
    
   


    return canFetch && graphBpm ? (
        <Performance 
            hasButtons={true} 
            title={title}
            getNext={getNext} 
            getPrevious={getPrevious} 
            context="bpm"
            desc="Fréquence cardiaque moyenne"
            startDate={new Date(bpmDates.startDate ?? "")} 
            endDate={new Date(bpmDates.endDate ?? "")} 
            color="#F4320B"
          >
            <ComposedChart width={503} height={307} data={graphBpm} responsive margin={{bottom:20,left:20}} >
                <XAxis dataKey="day" stroke="#707070" width={330} padding={{left:0,right:10}} tickCount={7} tickSize={25} tickLine={false} fontSize={12} />
                <YAxis dataKey="max" tickCount={4} width={16} fontSize={10} tickLine={false}/>
                <CartesianGrid strokeDasharray={"3 3"}  />
                <Bar dataKey="min" fill="#FCC1B6" barSize={14} radius={30}  />
                <Bar dataKey="max" fill="#F4320B" barSize={14} radius={30}  />
                <Line type="monotone" dataKey="average" stroke="#F2F3FF" strokeWidth={3} dot={{fill:"#0B23F4",stroke:"#0B23F4"}}/>
            </ComposedChart>
         </Performance>
    ): <Loading />
}