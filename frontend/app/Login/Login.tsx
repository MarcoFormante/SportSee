import { Form } from "~/components/loginForm/Form";
import LoginPhoto from "~/assets/images/loginPhoto.jpeg"

export function LoginPage() {

  return (
    <main className="max-[1440px]:flex  justify-evenly items-end min-[1440px]:mt-[150px] gap-[20px] ">
      <div className="ml-[150px] p-[40px] w-[398px] bg-white rounded-2xl  max-[1400px]:ml-[2vw]">
          <h1 className="loginTitle">
            Transformez <br/>vos stats en résultats
          </h1>
          <div className="mb-10 mt-10 flex flex-col gap-6">
            <h2>Se connecter</h2> 
            <Form/>
          </div>
          <p className="text-[14px] font-normal black-text mb-[40px]">Mot de passe oublié ?</p>
      </div>
      <div className="relative h-full max-[1440px]:pt-[40px]">
          <img className="min-[1440px]:fixed top-0 right-0 max-[1440px]:block  min-w-[468px]  max-[1440px]:w-[358px] " src={LoginPhoto} alt="" />
          <div className="absolute right-0 bottom-[0px]  max-[1440px]:bottom-2.5  max-[1440px]:right-2.5 w-[288px] bg-[#FFFFFF] rounded-[50px] flex justify-center items-center p-[16px] ">
            <p className="text-[12px] text-[#0B23F4]">
              Analysez vos performances en un clin d’œil,
              suivez vos progrès et atteignez vos objectifs.
            </p>
          </div>
      </div>
    </main>
  )
}

