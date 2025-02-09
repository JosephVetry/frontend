import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface Supplier {
  _id: string;
  supplier_name: string;
}

interface Product {
  id_product: string;
  quantity: number;
  price_per_unit: number;
  _id: string;
  product_name:any;
}

interface Transaction {
  _id: string;
  id_supplier: Supplier;
  products: Product[];
  amount_paid: number;
  total_transaction_price: number;
  is_completed: boolean;
  purchase_date: string;
  total_qty: number;
  __v: number;

}

const TransactionDetails = () => {
  const { transactionId } = useParams();
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTransaction = async () => {
      if (!transactionId) return;

      try {
        const response = await fetch(`http://localhost:3000/api/transaction/${transactionId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch transaction details");
        }
        const data: Transaction = await response.json();
        setTransaction(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTransaction();
  }, [transactionId]);

  if (loading) return <p>Loading transaction...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!transaction) return <p>No transaction found.</p>;

  return (
    <div className="max-w-4xl mx-auto mt-16 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Transaction Details</h1>
      <p><strong>Supplier:</strong> {transaction?.id_supplier?.supplier_name}</p>
      <p><strong>Purchase Date:</strong> {transaction?.purchase_date ? new Date(transaction.purchase_date).toLocaleString() : "N/A"}</p>
      <p><strong>Total Quantity:</strong> {transaction?.total_qty}</p>
      <p><strong>Total Price:</strong> Rp. {transaction?.total_transaction_price?.toLocaleString()}</p>
      <p><strong>Amount Paid:</strong> Rp. {transaction?.amount_paid?.toLocaleString()}</p>
      <p><strong>Status:</strong> {transaction?.is_completed ? "Completed" : "Pending"}</p>
      
      <h2 className="text-xl font-bold mt-6">Products</h2>
      <table className="w-full mt-4 border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2 text-left">Product Name</th>
            <th className="border border-gray-300 px-4 py-2 text-center">Quantity</th>
            <th className="border border-gray-300 px-4 py-2 text-center">Price per Unit</th>
            <th className="border border-gray-300 px-4 py-2 text-center">Total</th>
          </tr>
        </thead>
        <tbody>
          {transaction?.products?.map((product) => (
            <tr key={product._id} className="border-b border-gray-300">
              <td className="border border-gray-300 px-4 py-2">{product.product_name}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">{product.quantity}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">Rp. {product.price_per_unit.toLocaleString()}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">Rp. {(product.quantity * product.price_per_unit).toLocaleString()}</td>
            </tr>
          )) || (
            <tr>
              <td colSpan={4} className="text-center py-4">No products found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionDetails;
