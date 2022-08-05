import { ReactNode } from "react";

export interface cardItem {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  offer: boolean;
  createdAt: string;
}

export interface cardItemWhitQuantity extends cardItem{
  quantity: number;
}

export interface modalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface childrenOfProvider{
    children: ReactNode
}
