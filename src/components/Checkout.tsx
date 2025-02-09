import { useState } from "react";
import { Link } from "react-router-dom";

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

  const updateQuantity = (id: number, quantity: number) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const removeItem = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

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
                  <Link to={`/itemdetail/${item.id}`} className="text-blue-600 hover:underline">
                      Detail
                  </Link>
                </dl>
              </div>
              <div className="flex flex-1 items-center justify-end gap-2">
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                  className="h-8 w-12 rounded-sm border-gray-200 bg-gray-50 p-0 text-center text-xs text-gray-600 focus:outline-none"
                />
                <button onClick={() => removeItem(item.id)} className="text-gray-600 transition hover:text-red-600">
                  <span className="sr-only">Remove item</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                </button>
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
            <div className="flex justify-end">
              <button className="block rounded-sm bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600">
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

  );
};

export default Cart;
