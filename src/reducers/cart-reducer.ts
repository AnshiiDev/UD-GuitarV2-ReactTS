import { db } from "../data/db";
import type { CartItem, Guitar } from "../types";

// type de acciones para el carrito
export type CartActions =
  | { type: "add-to-cart"; payload: { item: Guitar } }
  | { type: "remove-from-cart"; payload: { id: Guitar["id"] } }
  | { type: "increase-quantity"; payload: { id: Guitar["id"] } }
  | { type: "decrease-quantity"; payload: { id: Guitar["id"] } }
  | { type: "clear-cart" };

//type de state
export type CartState = {
  data: Guitar[];
  cart: CartItem[];
};

const initialCart = (): CartItem[] => {
  const localStorageCart = localStorage.getItem("cart");
  return localStorageCart ? JSON.parse(localStorageCart) : [];
};

// type inicial
export const initialState: CartState = {
  data: db,
  cart: initialCart(),
};

const MAX_ITEMS = 5;
const MIN_ITEMS = 1;

// reducer
export const cartReducer = (
  state: CartState = initialState,
  action: CartActions,
) => {
  // ----- add-to-cart -----
  if (action.type === "add-to-cart") {
    const itemsExtist = state.cart.findIndex(
      (guitar) => guitar.id === action.payload.item.id,
    );
    let updatedCart: CartItem[] = [];

    if (itemsExtist >= 0) {
      updatedCart = state.cart.map((item) => {
        if (item.id === action.payload.item.id) {
          if (item.quantity < MAX_ITEMS) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        } else {
          return item;
        }
      });
    } else {
      const newItem: CartItem = { ...action.payload.item, quantity: 1 };
      updatedCart = [...state.cart, newItem];
    }
    return {
      ...state,
      cart: updatedCart,
    };
  }

  // ----- remove-from-cart -----
  if (action.type === "remove-from-cart") {
    const cart = state.cart.filter((guitar) => guitar.id !== action.payload.id);

    return {
      ...state,
      cart,
    };
  }

  // ----- increase-quantity -----
  if (action.type === "increase-quantity") {
    const cart = state.cart.map((item) => {
      if (item.id === action.payload.id && item.quantity < MAX_ITEMS) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }
      return item;
    });

    return {
      ...state,
      cart,
    };
  }

  // ----- decrease-quantity -----
  if (action.type === "decrease-quantity") {
    const cart = state.cart.map((item) => {
      if (item.id === action.payload.id && item.quantity > MIN_ITEMS) {
        return {
          ...item,
          quantity: item.quantity - 1,
        };
      }
      return item;
    });

    return {
      ...state,
      cart,
    };
  }

  // ----- clear-cart -----
  if (action.type === "clear-cart") {
    return {
      ...state,
      cart: [],
    };
  }
  return state;
};
