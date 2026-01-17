import { Form } from "~/components/loginForm/Form";

export function LoginPage() {

  return (
    <main>
      <div className="ml-[150px] p-[40px] w-[398px] bg-white rounded-2xl mt-[151px]">
          <h1 className="loginTitle">
            Transformez <br/>vos stats en résultats
          </h1>
          <div className="mb-10 mt-10 flex flex-col gap-6">
            <h2>Se connecter</h2> 
            <Form/>
          </div>
          <p className="text-[14px] font-normal black-text mb-[40px]">Mot de passe oublié ?</p>
      </div>
    </main>
  )
}

