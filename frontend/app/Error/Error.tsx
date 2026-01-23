
export function Error({status}:{status:number}){
    return (
        <div className="flex justify-center mt-10">
            <div>
                <div>
                    <p className="text-[32px]">
                    {  status === 404 && "Cette page n'existe pas"}
                    {  status !== 404 && "Une erreur inattendue est survenue"}
                    </p>
                </div>
            </div>
        </div>
    )
}