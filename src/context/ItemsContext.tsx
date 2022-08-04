import React, { ReactNode, useContext, useState } from "react";
import allItems from '../data/items.json'

type Item = {
    id: number
    name: string
    price: number
    imageUrl: string,
    offer: boolean,
    createdAt: string
}

type ItemContextTypes = {
    isFiltering: boolean
    changeFiltering: ()=> void
    filterByPrice: (from: number, to: number)=> void
    filterByLowerOrHigherPrice: (option: string)=> void
    filterByRecentOrOldestDate: (option: string)=> void
    filterByName: (name: string)=> void
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
    const [isFiltering, setIsFiltering] = useState<boolean>(false)

    const changeFiltering = ()=> setIsFiltering(!isFiltering)

    function filterByPrice(from: number, to: number){
        if(to > 0 && !Number.isNaN(to)){
            setItems(allItems.filter(item => (item.price >= from) && (item.price <= to)))
        }else{
            setItems(allItems)
        }
    }

    function filterByLowerOrHigherPrice(option: string){
        switch(option){
            case 'lowerPrice':
                setItems(prevItems => prevItems.sort((prevItem, nextItem)=> prevItem.price - nextItem.price))
                break
            case 'higherPrice':
                setItems(prevItems => prevItems.sort((prevItem, nextItem)=> nextItem.price - prevItem.price))
                break
            default:
                setItems(allItems)
        }
    }

    function filterByRecentOrOldestDate(option: string){
        switch(option){
            case 'moreRecent':
                setItems(prevItems => prevItems.sort((previtem, nextItem) =>(new Date(previtem.createdAt).getTime() - new Date(nextItem.createdAt).getTime())))
                break
            case 'oldest':
                setItems(prevItems => prevItems.sort((previtem, nextItem) =>(new Date(nextItem.createdAt).getTime() - new Date(previtem.createdAt).getTime())))
                break
            default:
                setItems(allItems)
        }
    }

    function filterByName(name: string){
        if(name){
            setItems(prevItems => prevItems.filter(item => item.name.toLowerCase().includes(name.toLowerCase())))
        }else{
            setItems(allItems)
        }
    }
    return <ItemsContext.Provider value={{filterByPrice, isFiltering, changeFiltering, items, filterByLowerOrHigherPrice,filterByRecentOrOldestDate, filterByName}}>{children}</ItemsContext.Provider>
}