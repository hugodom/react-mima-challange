import create from "zustand";
import { devtools } from "zustand/middleware";
import { Grocery, CartItemModel } from "../shared/models/grocery";

export interface GlobalState {
  groceries: Grocery[];
  cartItems: CartItemModel[];
  totalCart: number;
  cartOpen: boolean;
  firstLoadGroceries: (loadedGroceries: Grocery[]) => void;
  removeFromStore: (id: string) => void;
  removeFromStock: (id: string) => void;
  addToCart: (item: CartItemModel) => void;
  removeFromCart: (id: string) => void;
  addToStock: (id: string) => void;
  addToTotal: (value: number) => void;
  removeFromTotal: (value: number) => void;
  toggleCart: () => void;
}

const useStore = create<GlobalState>(
  devtools((set) => ({
    groceries: [],

    cartItems: [],

    totalCart: 0,

    cartOpen: false,

    // loadGroceries: (loadedGroceries: Grocery[]) =>
    //   set((state: GlobalState) => ({
    //     groceries: state.groceries.concat(loadedGroceries),
    //   })),

    firstLoadGroceries: (loadedGroceries: Grocery[]) =>
      set((state: GlobalState) => ({
        groceries: loadedGroceries,
      })),

    removeFromStore: (id: string) =>
      set((state: GlobalState) => ({
        groceries: state.groceries.filter(
          (grocery: Grocery) => grocery.id !== id
        ),
      })),

    addToCart: (item: CartItemModel) =>
      set((state: GlobalState) => {
        const cartState = [...state.cartItems];
        const foundItem = cartState.find(
          (storedValue) => storedValue.id === item.id
        );
        if (foundItem) {
          foundItem.total += 1;
          return {
            cartItems: [...state.cartItems],
          };
        }
        const itemCopy = item;
        itemCopy.total = 1;
        return {
          cartItems: [...state.cartItems, itemCopy],
        };
      }),

    removeFromCart: (id: string) =>
      set((state: GlobalState) => {
        const cartState = [...state.cartItems];
        const foundItem = cartState.find(
          (storedValue) => storedValue.id === id
        );
        if (foundItem && foundItem.total >= 2) {
          foundItem.total -= 1;
          return {
            cartItems: [...state.cartItems],
          };
        }
        return {
          cartItems: state.cartItems.filter(
            (cartItem: CartItemModel) => cartItem.id !== id
          ),
        };
      }),

    removeFromStock: (id: string) =>
      set((state: GlobalState) => {
        const newGroceries = [...state.groceries];
        const modifiedItem = newGroceries.find((item) => item.id === id);
        if (modifiedItem) {
          modifiedItem.stock -= 1;
          return {
            groceries: [...state.groceries],
          };
        }
        return {
          groceries: [...state.groceries],
        };
      }),

    addToStock: (id: string) =>
      set((state: GlobalState) => {
        const newGroceries = [...state.groceries];
        const modifiedItem = newGroceries.find((item) => item.id === id);
        if (modifiedItem) {
          modifiedItem.stock += 1;
          return {
            groceries: [...state.groceries],
          };
        }
        return {
          groceries: [...state.groceries],
        };
      }),

    addToTotal: (value: number) =>
      set((state: GlobalState) => ({
        totalCart: state.totalCart + value,
      })),
    removeFromTotal: (value: number) =>
      set((state: GlobalState) => ({
        totalCart: state.totalCart - value,
      })),

    toggleCart: () =>
      set((state: GlobalState) => ({
        cartOpen: !state.cartOpen,
      })),
  }))
);

export default useStore;
