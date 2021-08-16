import {useCallback} from "react";


//window.M - объект всплывающих сообщений
export const useMessage = () =>{
return useCallback(text=>{
    if(window.M && text){
        window.M.toast({html: text})
    }
},[])
}
