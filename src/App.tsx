import Guitar from "./components/Guitar";
import Header from "./components/Header";
import { useEffect, useReducer } from "react";
// import { db } from "./data/db";
// import { useCart } from "./hooks/useCart";
import { cartReducer, initialState } from "./reducers/cart-reducer";

//imprtacion luego dela migración del hook useCart
function App() {
  // custom hook useCart
  // const {
  //   data,
  //   cart,
  //   // addToCart,
  //   removeFromCart,
  //   increaseQuantity,
  //   decreaseQuantity,
  //   clearCart,
  // } = useCart();

  //implementacion de useReducer
  const [state, dispatch] = useReducer(cartReducer, initialState);

  //useEffect para sincronizar el carrito con localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.cart));
  }, [state.cart]);

  return (
    <>
      <Header
        cart={state.cart}
        dispatch={dispatch}
        // increaseQuantity={increaseQuantity}
        // decreaseQuantity={decreaseQuantity}
        // clearCart={clearCart}
      />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {state.data.map((guitar) => (
            <Guitar
              //{key} importante cuando se itera
              key={guitar.id}
              guitar={guitar}
              dispatch={dispatch}
            />
          ))}
        </div>
      </main>

      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">
            GuitarLA - Todos los derechos Reservados
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;
