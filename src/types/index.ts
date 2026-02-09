export type Guitar = {
  id: number;
  name: string;
  image: string;
  description: string;
  price: number;
};

// CartItem extiende de Guitar y agrega la propiedad quantity (herencia)
// export type CartItem = Guitar & {
//   quantity: number;
// };

//  CartItem extiende de Guitar y agrega la propiedad quantity
// export interface CartItem extends Guitar {
//   quantity: number;
// };

//utility types
// Pick: selecciona solo las propiedades id, name y price de Guitar y agrega la propiedad quantity
export type CartItem = Pick<Guitar, "id" | "name" | "image" | "price"> & {
  quantity: number;
};

// Omit: omitir las propiedades id, name y price de Guitar y agregar la propiedad quantity
// export type CartItem = Omit<Guitar, "description" | "image" > & {
//   quantity: number;
// };

export type GuitarID = Guitar["id"];
