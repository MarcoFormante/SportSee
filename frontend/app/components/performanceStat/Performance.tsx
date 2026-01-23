

export function Performance(
    {
        children,
        hasButtons,
        color,
        title,
        context,
        startDate,
        endDate,
        desc,
        getPrevious,
        getNext
    }
    :
    {
        children:React.ReactNode
        hasButtons:boolean,
        color:string,
        title:string,
        context:string,
        startDate:Date,
        endDate:Date,
        desc:string,
        getPrevious:({context}:{context:string})=>void,
        getNext:({context}:{context:string})=>void
    }){
    

    return (
        <div className="px-[40px] pt-[16px] max-[1170px]:px-[8px]">
            <div className="flex gap-[10px] items-center justify-between">
                <p className={`text-[22px] pb-2 text-[${color}]`}>{title}</p>
                <div>
                    { hasButtons && 
                    <div className="flex items-center gap-[4.5px] ">
                        <button onClick={()=>getPrevious({context:context ?? ""})} className="cursor-pointer border border-[#717171] w-[24px] h-[24px] rounded-[10px] flex justify-center items-center">{"<"}</button>
                        <span className="text-[12px] font-normal text-[#111111]">{startDate.toLocaleString("fr-FR",{day:"2-digit",month:"short"})} - {endDate.toLocaleString("fr-FR",{day:"2-digit",month:"short"})}</span>
                        <button onClick={()=>getNext({context:context ?? ""})} className="cursor-pointer border border-[#717171] w-[24px] h-[24px] rounded-[10px] flex justify-center items-center">{">"}</button>
                    </div>
                    }
                </div>
            </div>

            <div className="mb-[40px]">
                <p className="text-[12px] font-normal text-[#707070]">{desc}</p>
            </div>
                {children}
        </div>
    )
}