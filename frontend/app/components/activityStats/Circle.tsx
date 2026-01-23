import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Legend, type PieSectorShapeProps, Sector } from "recharts";


const COLORS = ['#0B23F4', '#B6BDFC'];

const MyCustomPie = (props: PieSectorShapeProps) => {
  return <Sector {...props} fill={COLORS[props.index % COLORS.length]} />;
};


export function Circle({weeklyGoal}:{weeklyGoal:number}) {
    const [data,setData] = useState([
    { name: "restant", value: 0, color: "#fff" }, 
    { name: "réalisées", value: 0, color: "#fff" }
]);

useEffect(()=>{
        setData([
           
            { name: "réalisées", value: weeklyGoal , color: "#fff" },
             { name: "restant", value: 6 - weeklyGoal , color: "#fff" }
        ])
},[weeklyGoal])

  return (
    <PieChart width={300} height={200}>
      <Pie
        data={data}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        innerRadius={30}
        outerRadius={70}
        paddingAngle={0}
        startAngle={-200}
        endAngle={360}
        fill={"#fff"}
        shape={MyCustomPie}
        radius={25}
      />
    </PieChart>
  );
}
