import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

interface CartProps {
  supplierId?: string;
}

interface Product {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  sellPrice?: number;
}

const Cart: React.FC<CartProps> = ({ supplierId: propSupplierId }) => {
  const navigate = useNavigate();
  const { supplierId: paramSupplierId } = useParams<{ supplierId: string }>();

  // Gunakan supplierId dari props jika ada, jika tidak, ambil dari useParams
  const supplierId = propSupplierId || paramSupplierId;

  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [amountPaid, setAmountPaid] = useState<number>(0);
  const [message, setMessage] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!supplierId) return; // Hindari fetch jika supplierId tidak ada

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
  
    if (!supplierId) {
      setMessage("Supplier ID is missing.");
      return;
    }
  
    const amountPaidNum = Number(amountPaid);
  
    if (amountPaidNum > subtotal) {
      setMessage(`❌ Amount Paid cannot exceed ${formatRupiah(subtotal)}`);
      return;
    }
  
    const transactionData = {
      id_supplier: supplierId,
      products: cartItems.map((item) => ({
        id_product: item._id,
        quantity: item.quantity,
        price_per_unit: item.sellPrice ?? item.price,
      })),
      amount_paid: amountPaidNum,
    };
  
    try {
      const response = await fetch("https://pharmacy-api-roan.vercel.app/api/transaction", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(transactionData),
      });
  
      if (!response.ok) {
        throw new Error("Transaction failed");
      }
  
      setShowModal(true);
      setCartItems([]);
      setAmountPaid(0);
  
      setTimeout(() => {
        setShowModal(false);
        navigate("/dashboard");
      }, 2000);
    } catch (err: any) {
      setMessage(`❌ ${err.message}`);
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
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      <button type="button" onClick={() => updateQuantity(item._id, Math.max(1, item.quantity - 1))}>−</button>
                      <span className="mx-2">{item.quantity}</span>
                      <button type="button" onClick={() => updateQuantity(item._id, item.quantity + 1)}>+</button>
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center">{formatRupiah(item.price * item.quantity)}</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      <button type="button" onClick={() => removeItem(item._id)}>🗑️</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-8 flex justify-end border-t border-gray-100 pt-8">
  <div className="w-screen max-w-lg space-y-4">
    <dl className="text-sm text-gray-700">
      <div className="flex justify-between">
        <dt>Subtotal</dt>
        <dd>{formatRupiah(subtotal)}</dd>
      </div>
    </dl>
    
    {/* Amount Paid dengan tampilan format Rupiah */}
    <input
  type="text" // Change type to "text" to allow formatted display
  value={amountPaid === 0 ? "" : `Rp. ${amountPaid?.toLocaleString("id-ID") ?? ""}`}
  onChange={(e) => {
    // Remove non-numeric characters (dots, spaces, etc.)
    const rawValue = e.target.value.replace(/\D/g, "");
    const inputAmount = parseInt(rawValue, 10);


    // Ensure the input amount is valid and doesn't exceed the remaining balance
    const newAmount = isNaN(inputAmount) ? 0 : Math.min(inputAmount, subtotal);

    setAmountPaid(newAmount);
  }}
  placeholder="Rp. 0"
  className="border p-2 rounded w-full mt-2"
/>




        <button type="submit" className="bg-gray-700 px-5 py-3 text-sm text-gray-100 hover:bg-gray-600">
          Checkout
        </button>
        
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
