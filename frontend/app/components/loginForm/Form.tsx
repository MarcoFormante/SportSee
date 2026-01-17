import { useEffect, useState, type FormEvent, type FormEventHandler } from "react";
import { useNavigate } from "react-router";


export function Form() {
  const [error,setError] = useState("")
  const navigate = useNavigate()

    async function onSubmit(e:FormEvent<HTMLFormElement>){
            e.preventDefault()
            const formData = new FormData(e.currentTarget)
            const password = formData.get("password")
            const username = formData.get("username")
            
            const res = await fetch("http://localhost:8000/api/login",{
              method:"POST",
              headers:{
                "Content-type":"application/json"
              },
              body:JSON.stringify({password,username})
            })

            const data = await res.json();

            if (data.message) {
                setError(data.message)
            }
            if (data.token) {
                navigate("/dashboard")
            }
        }

    function removeErrorOnChange(){
        if (error) {
          setError("")
        }
    }

    return (
    <form onSubmit={onSubmit}>

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
      <button className="mt-[40px] text-white" type="submit">
        Se connecter
      </button>

    
    </form>
  );
}
