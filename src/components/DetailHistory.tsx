import { useState } from "react";

interface CartItem {
  id: number;
  name: string;
  size: string;
  color: string;
  price: number;
  image: string;
  quantity: number;
}

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "Basic Tee 6-Pack",
      size: "XXS",
      color: "White",
      price: 50,
      image:
        "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=830&q=80",
      quantity: 1,
    },
    {
      id: 2,
      name: "Basic Tee 6-Pack",
      size: "XXS",
      color: "White",
      price: 50,
      image:
        "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=830&q=80",
      quantity: 1,
    },
  ]);

//   const updateQuantity = (id: number, quantity: number) => {
//     setCartItems((prev) =>
//       prev.map((item) => (item.id === id ? { ...item, quantity } : item))
//     );
//   };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const total = subtotal

  return (
    <section className="mt-16"> {/* Sesuaikan angka ini dengan tinggi navbar */}
  <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
    <div className="mx-auto max-w-3xl">
      <header className="text-center">
        <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">Detail Transaction</h1>
      </header>
      <div className="mt-8">
        <ul className="space-y-4">
          {cartItems.map((item) => (
            <li key={item.id} className="flex items-center gap-4">
              <img src={item.image} alt={item.name} className="size-16 rounded-sm object-cover" />
              <div>
                <h3 className="text-sm text-gray-900">{item.name}</h3>
                <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                  <div>
                    <dt className="inline">Size:</dt>
                    <dd className="inline">{item.size}</dd>
                  </div>
                  <div>
                    <dt className="inline">Color:</dt>
                    <dd className="inline">{item.color}</dd>
                  </div>
                </dl>
              </div>
              <div className="flex flex-1 items-center justify-end gap-2">
              <span className="h-8 w-12 flex items-center justify-center rounded-sm border border-gray-200 bg-gray-50 text-xs text-gray-600">
                  {item.quantity}
                </span>

              </div>
            </li>
          ))}
        </ul>
        <div className="mt-8 flex justify-end border-t border-gray-100 pt-8">
          <div className="w-screen max-w-lg space-y-4">
            <dl className="space-y-0.5 text-sm text-gray-700">
              <div className="flex justify-between">
                <dt>Subtotal</dt>
                <dd>Rp. {subtotal.toFixed(2)}</dd>
              </div>
              <div className="flex justify-between !text-base font-medium">
                <dt>Total</dt>
                <dd>Rp. {total.toFixed(2)}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

  );
};

export default Cart;
