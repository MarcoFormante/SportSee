import {useContext, useEffect, useState, type FormEvent } from "react";
import {useNavigate } from "react-router";
import { useFetch } from "~/hooks/useFetch";
import { UserDataContext } from "~/providers/userProvider";


export function Form() {
  const [error,setError] = useState("")
  const [username,setUsername] = useState<FormDataEntryValue>("")
  const [password,setPassword] = useState<FormDataEntryValue>("")
  const navigate = useNavigate()
  const [canFetch,setCanFetch] = useState(false)
  const {data} = useFetch({method:"POST",url:"api/login",body:{username,password},canFetch:canFetch})
  const userContext = useContext(UserDataContext)
  
    async function onSubmit(e:FormEvent<HTMLFormElement>){
      e.preventDefault()
      const formData = new FormData(e.currentTarget)
      const password = formData.get("password") ?? ""
      const username = formData.get("username") ?? ""

      if (!password || !username) {
        setError("Identifiant et mot de passe obligatoires")
        return 
      }
      setUsername(username)
      setPassword(password)
      setCanFetch(true)
    }


    useEffect(()=>{
      if (data?.message) {
        setError(data.message)
        setCanFetch(false)
      }else{
        if(data?.token){
          userContext.setToken(data.token)
          navigate("/profile")
        } 
      }
      
    },[data])


    function removeErrorOnChange(){
        if (error) {
          setError("")
        }
    }

    return (
    <form onSubmit={onSubmit} method="POST">
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <div className="mb-6">
        <label className="mb-2" htmlFor="username">Username</label>
        <input
          className="border-[0.5px] h-[58px] rounded-[10px]"
          type="text"
          name="username"
          id="username"
          onChange={removeErrorOnChange}
        />
      </div>
      <div>
        <label className="mb-2" htmlFor="password">Mot de passe</label>
        <input
          className="border-[0.5px] h-[58px] rounded-[10px]"
          type="password"
          name="password"
          id="password"
          onChange={removeErrorOnChange}
        />
      </div>
      <button className="mt-[40px] text-white cursor-pointer" type="submit">
        Se connecter
      </button>
    </form>
  );
}
