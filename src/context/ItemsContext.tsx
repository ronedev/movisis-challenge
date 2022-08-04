import React, { ReactNode, useContext, useState } from "react";
import allItems from '../data/items.json'

type Item = {
    id: number
    name: string
    price: number
    imageUrl: string
}

type ItemContextTypes = {
    filterByPrice: (from: number, to: number)=> void
    items: Item[]
}

type ItemProviderTypes = {
    children: ReactNode
}

const ItemsContext = React.createContext({} as ItemContextTypes)

export function useItemsContext(){
    return useContext(ItemsContext)
}

export function ItemsContextProvider({children}: ItemProviderTypes){
    const [items, setItems] = useState<Item[]>(allItems)

    function filterByPrice(from: number, to: number){
        if(to > 0 && !Number.isNaN(to)){
            setItems(allItems.filter(item => (item.price >= from) && (item.price <= to)))
        }else{
            setItems(allItems)
        }
    }

    return <ItemsContext.Provider value={{filterByPrice, items}}>{children}</ItemsContext.Provider>
}