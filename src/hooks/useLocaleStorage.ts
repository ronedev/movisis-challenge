import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T | (()=> T) ){
    const [value, setValue] = useState<T>(()=>{
        const storageValue = localStorage.getItem(key)

        if(storageValue != null) return JSON.parse(storageValue)

        if(typeof storageValue === 'function'){
            return (initialValue as ()=> T)()
        }else{
            return initialValue
        }
    })

    useEffect(()=>{
        localStorage.setItem(key, JSON.stringify(value))
    }, [key, value])

    return [value, setValue] as [typeof value, typeof setValue]
}