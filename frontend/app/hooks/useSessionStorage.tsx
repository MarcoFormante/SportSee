export function useSessionStorage(){

    function set({name,data}:{name:string,data:any}){
        if (typeof sessionStorage !== "undefined") {
            sessionStorage.setItem(name,JSON.stringify(data))
        }
    }

    return {set}
    
}