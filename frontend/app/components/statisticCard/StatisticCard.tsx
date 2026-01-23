export function StatisticCard({title,statistic,context,textCenter,paddingLeft = ""}:{title?:string,statistic:string|number,context:string, textCenter?:boolean,width?:string,paddingLeft?:string}){

    return (
        <div className={`bg-[#0B23F4] rounded-[10px] pt-[20px] pl-[${paddingLeft ? paddingLeft :  "30"}px] h-[103px] w-[278px] max-[1200px]:w-[19vw]  max-[1300px]:pl-[10px]  max-[1300px]:pr-[2px] max-[1100px]:px-[5px]`}>
            <div className="flex flex-col gap-[19px]">
                <p className="text-[14px]">{title}</p>
                <div className={`flex gap-1 items-center ${textCenter ? "justify-center" : ""}`}>
                    <p className="text-[22px] text-[#FFFFFF]">{statistic} </p> <span className="text-[#B6BDFC]">{context}</span>
                </div>
            </div>
        </div>
    )
}