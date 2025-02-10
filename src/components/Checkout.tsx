import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

interface CartProps {
  supplierId?: string;
}

interface Product {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  sellPrice?: number
}

const Cart: React.FC<CartProps> = ({ supplierId:any }) => {
  const [showModal, setShowModal] = useState(false);
const navigate = useNavigate();
const { supplierId } = useParams<{ supplierId: string }>();
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [amountPaid, setAmountPaid] = useState<number>(0);
  const [message, setMessage] = useState<string | null>(null);
  

  useEffect(() => {
    const fetchProducts = async () => {
      if (!supplierId) return;

      try {
        const response = await fetch(`https://pharmacy-api-roan.vercel.app/api/supplier/${supplierId}/product`);
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setCartItems(data.products.map((product: Product) => ({ ...product, quantity: 1 })));
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [supplierId]);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error: {error}</p>;

  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const updateQuantity = (id: string, quantity: number) => {
    setCartItems((prev) =>
      prev.map((item) => (item._id === id ? { ...item, quantity } : item))
    );
  };


  

  const removeItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item._id !== id));
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const transactionData = {
      id_supplier: supplierId,
      products: cartItems.map((item) => ({
        id_product: item._id,
        quantity: item.quantity,
        price_per_unit: item.sellPrice ?? item.price,
      })),
      amount_paid: amountPaid,
    };
  
    console.log(transactionData);
  
    try {
      const response = await fetch("https://pharmacy-api-roan.vercel.app/api/transaction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transactionData),
      });
  
      if (!response.ok) {
        throw new Error("Transaction failed");
      }
  
      setShowModal(true); // ✅ Show success modal
      setCartItems([]);
      setAmountPaid(0);
  
      // ✅ Redirect to /dashboard after 2 seconds
      setTimeout(() => {
        setShowModal(false);
        navigate("/dashboard");
      }, 2000);
    } catch (err: any) {
      setMessage(`Error: ${err.message}`);
    }
  };

  return (
    <section className="mt-16">
      {showModal && (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
    <div className="bg-white p-6 rounded-lg shadow-lg text-center">
      <h2 className="text-lg font-bold text-green-600">Transaction Successful!</h2>
      <p className="text-gray-700">Redirecting to Dashboard...</p>
    </div>
  </div>
)}

      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <header className="text-center">
            <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">Detail Transaction</h1>
          </header>
          <form onSubmit={handleSubmit} className="mt-8">
            <table className="w-full border-collapse border border-gray-300 mt-8">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2 text-left">Product</th>
                  <th className="border border-gray-300 px-4 py-2 text-center">Price</th>
                  <th className="border border-gray-300 px-4 py-2 text-center">Quantity</th>
                 
                  <th className="border border-gray-300 px-4 py-2 text-center">Total</th>
                  <th className="border border-gray-300 px-4 py-2 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
              {cartItems.map((item) => (
  <tr key={item._id} className="border-b border-gray-300">
    <td className="border border-gray-300 px-4 py-2">{item.name}</td>
    <td className="border border-gray-300 px-4 py-2 text-center">{formatRupiah(item.price)}</td>
    
    {/* Quantity Controls */}
    <td className="border border-gray-300 px-4 py-2 text-center flex items-center justify-center space-x-2">
      <button
        type="button"
        onClick={() => updateQuantity(item._id, Math.max(1, item.quantity - 1))}
        className="h-8 w-8 flex items-center justify-center bg-gray-200 rounded text-gray-700 hover:bg-gray-300"
      >
        −
      </button>
      <span className="w-8 text-center">{item.quantity}</span>
      <button
        type="button"
        onClick={() => updateQuantity(item._id, item.quantity + 1)}
        className="h-8 w-8 flex items-center justify-center bg-gray-200 rounded text-gray-700 hover:bg-gray-300"
      >
        +
      </button>
    </td>

 

    <td className="border border-gray-300 px-4 py-2 text-center">{formatRupiah(item.price * item.quantity)}</td>
    <td className="border border-gray-300 px-4 py-2 text-center">
      <button type="button" onClick={() => removeItem(item._id)} className="text-red-600 transition hover:text-red-800">
        <span className="sr-only">Remove item</span>
        🗑️
      </button>
    </td>
  </tr>
))}

              </tbody>
            </table>

            <div className="mt-8 flex justify-end border-t border-gray-100 pt-8">
              <div className="w-screen max-w-lg space-y-4">
                <dl className="space-y-0.5 text-sm text-gray-700">
                  <div className="flex justify-between">
                    <dt>Subtotal</dt>
                    <dd>{formatRupiah(subtotal)}</dd>
                  </div>
                  <div className="flex justify-between !text-base font-medium">
                    <dt>Total</dt>
                    <dd>{formatRupiah(subtotal)}</dd>
                  </div>
                </dl>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">Amount Paid</label>
                  <input
                    type="number"
                    value={amountPaid}
                    onChange={(e) => setAmountPaid(Number(e.target.value))}
                    className="mt-1 block w-full rounded-sm border border-gray-300 p-2 text-sm focus:outline-none"
                    required
                  />
                </div>
                <div className="flex justify-end mt-4">
                  <button
                    type="submit"
                    className="block rounded-sm bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
                  >
                    Checkout
                  </button>
                </div>
                {message && <p className="text-center text-sm text-gray-700 mt-2">{message}</p>}
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Cart;
