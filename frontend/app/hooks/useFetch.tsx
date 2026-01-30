import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export function useFetch({method,url,body,token = "",canFetch} : {method:string, url:string, body?:null|{},token?:string,canFetch:boolean}){
    const [status,setStatus] = useState(0)
    const [data,setData] = useState<any>(null)
    const navigate = useNavigate()

    useEffect(()=>{
        async function fetchData()
        {
            const postObject: RequestInit = {
                headers:{
                    "Content-Type":"application/json",
                },
                credentials: "include",
                body:JSON.stringify(body),
                method:"POST"
            }

            const getObject: RequestInit = {
                headers:{
                    "Content-Type":"application/json",
                    "authorization" : "Bearer " + token,
                },
                credentials: 'include',
                method:"GET"
            }

            const fetchDataObject = method === "POST" ? postObject : getObject
            try {
                const req = await fetch("http://localhost:8000/" + url, fetchDataObject)
                setStatus(req.status)
                setData(await req.json())
            } catch (error) {
                navigate("/")
            }
        }

        if (canFetch === true) {
            fetchData()
        }
    },[canFetch,url])
    
    
    

    return {data,status,setStatus,setData}
}