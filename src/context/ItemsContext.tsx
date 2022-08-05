import React, { ReactNode, useContext, useState } from "react";
import allItems from "../data/items.json";
import { cardItem, childrenOfProvider } from "../interfaces/interfaces";

type ItemContextTypes = {
  isFiltering: boolean;
  changeFiltering: () => void;
  filterByPrice: (from: number, to: number) => void;
  filterByLowerOrHigherPrice: (option: string) => void;
  filterByRecentOrOldestDate: (option: string) => void;
  filterByName: (name: string) => void;
  filterByOffered: (isFiltering: boolean) => void;
  items: cardItem[];
};

const ItemsContext = React.createContext({} as ItemContextTypes);

export function useItemsContext() {
  return useContext(ItemsContext);
}

export function ItemsContextProvider({ children }: childrenOfProvider) {
  const [items, setItems] = useState<cardItem[]>(allItems);
  const [isFiltering, setIsFiltering] = useState<boolean>(false);

  const changeFiltering = () => setIsFiltering(!isFiltering);

  function filterByPrice(from: number, to: number) {
    if (to > 0 && !Number.isNaN(to)) {
      //Has been specified correctly until amount
      setItems(
        allItems.filter((item) => item.price >= from && item.price <= to)
      );
    } else {
      //Hasn't been specified correctly until amount
      setItems(allItems);
    }
  }

  function filterByLowerOrHigherPrice(option: string) {
    switch (option) {
      case "lowerPrice":
        setItems((prevItems) =>
          prevItems.sort(
            (prevItem, nextItem) => prevItem.price - nextItem.price
          )
        );
        break;
      case "higherPrice":
        setItems((prevItems) =>
          prevItems.sort(
            (prevItem, nextItem) => nextItem.price - prevItem.price
          )
        );
        break;
      default:
        setItems(allItems);
    }
  }

  function filterByRecentOrOldestDate(option: string) {
    switch (option) {
      case "moreRecent":
        setItems((prevItems) =>
          prevItems.sort(
            (previtem, nextItem) =>
              new Date(previtem.createdAt).getTime() -
              new Date(nextItem.createdAt).getTime()
          )
        );
        break;
      case "oldest":
        setItems((prevItems) =>
          prevItems.sort(
            (previtem, nextItem) =>
              new Date(nextItem.createdAt).getTime() -
              new Date(previtem.createdAt).getTime()
          )
        );
        break;
      default:
        setItems(allItems);
    }
  }

  function filterByName(name: string) {
    if (name) {
      //Input changes contain values
      setItems((prevItems) =>
        prevItems.filter((item) =>
          item.name.toLowerCase().includes(name.toLowerCase())
        )
      );
    } else {
      //Input changes do not contain values
      setItems(allItems);
    }
  }

  function filterByOffered(isFiltering: boolean) {
    if (isFiltering) {
      //Input checked active
      setItems((prevItems) => prevItems.filter((item) => item.offer));
    } else {
      //Input chcked inactive
      setItems(allItems);
    }
  }

  return (
    <ItemsContext.Provider
      value={{
        filterByPrice,
        isFiltering,
        changeFiltering,
        items,
        filterByLowerOrHigherPrice,
        filterByRecentOrOldestDate,
        filterByName,
        filterByOffered,
      }}
    >
      {children}
    </ItemsContext.Provider>
  );
}
