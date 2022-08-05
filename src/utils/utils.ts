import allItems from "../data/items.json";

type Item = {
  id: number;
  quantity: number;
};
type totalItem= {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  offer: boolean;
  createdAt: string;
  quantity: number;
};

export function getCartItems(cartItems: Item[]) {
  let items: totalItem[] = [];
  if (cartItems.length > 0) {
    cartItems.forEach((cartItem) => {
      allItems.forEach((item) =>
        cartItem.id === item.id
          ? items.push({ ...item, quantity: cartItem.quantity })
          : null
      );
    });
  }
  return items;
}
