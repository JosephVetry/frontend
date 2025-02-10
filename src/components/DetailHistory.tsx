// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import autoTable from "jspdf-autotable";
// import jsPDF from "jspdf";


// interface Supplier {
//   _id: string;
//   supplier_name: string;
// }

// interface Product {
//   id_product: string;
//   quantity: number;
//   price_per_unit: number;
//   _id: string;
//   product_name: string;
// }

// interface Transaction {
//   _id: string;
//   id_supplier: Supplier;
//   products: Product[];
//   amount_paid: number;
//   total_transaction_price: number;
//   is_completed: boolean;
//   purchase_date: string;
//   total_qty: number;
//   __v: number;
// }

// const TransactionDetails = () => {
//   const { transactionId } = useParams();
//   const navigate = useNavigate();

//   const [transaction, setTransaction] = useState<Transaction | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const [amountPaid, setAmountPaid] = useState<number | null>(null);
//   const [modalMessage, setModalMessage] = useState<string | null>(null);
//   const [modalVisible, setModalVisible] = useState<boolean>(false);
//   const [isErrorModal, setIsErrorModal] = useState<boolean>(false);

//   useEffect(() => {
//     const fetchTransaction = async () => {
//       if (!transactionId) return;

//       try {
//         const response = await fetch(`https://pharmacy-api-roan.vercel.app/api/transaction/${transactionId}`);
//         if (!response.ok) throw new Error("Failed to fetch transaction details");

//         const data: Transaction = await response.json();
//         setTransaction(data);
//         setAmountPaid(data.amount_paid);
//       } catch (err: any) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTransaction();
//   }, [transactionId]);

//   const handleDownloadPDF = () => {
//     if (!transaction) return;
  
//     const doc = new jsPDF();
//     doc.setFont("helvetica", "bold");
//     doc.text("Transaction Details", 14, 20);
  
//     // ✅ Add transaction details
//     doc.setFont("helvetica", "normal");
//     doc.text(`Supplier: ${transaction.id_supplier.supplier_name}`, 14, 30);
//     doc.text(`Purchase Date: ${new Date(transaction.purchase_date).toLocaleString()}`, 14, 40);
//     doc.text(`Total Quantity: ${transaction.total_qty}`, 14, 50);
//     doc.text(`Total Price: Rp. ${transaction.total_transaction_price.toLocaleString()}`, 14, 60);
//     doc.text(`Amount Paid: Rp. ${transaction.amount_paid.toLocaleString()}`, 14, 70);
//     doc.text(`Status: ${transaction.is_completed ? "Completed" : "Pending"}`, 14, 80);
  
//     // ✅ Add product table
//     autoTable(doc, {
//       startY: 90, // Start after the transaction details
//       head: [["Product Name", "Quantity", "Price per Unit", "Total"]],
//       body: transaction.products.map(product => [
//         product.product_name,
//         product.quantity,
//         `Rp. ${product.price_per_unit.toLocaleString()}`,
//         `Rp. ${(product.quantity * product.price_per_unit).toLocaleString()}`
//       ]),
//     });
  
//     // ✅ Save the PDF
//     doc.save("transaction_details.pdf");
//   };
  

//   const handleUpdatePayment = async () => {
//     if (!transaction || amountPaid === null) return;

//     const newAmountPaid = isNaN(amountPaid) ? 0 : amountPaid; // Prevent NaN
//     if (newAmountPaid < transaction.amount_paid) {
//       setModalMessage("❌ New amount must be greater than the current amount paid.");
//       setIsErrorModal(true);
//       setModalVisible(true);
//       return;
//     }

//     try {
//       const response = await fetch(`https://pharmacy-api-roan.vercel.app/api/transaction/${transaction._id}/amount-paid`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ amount_paid: newAmountPaid }),
//       });

//       if (!response.ok) throw new Error("Failed to update amount paid");

//       const updatedTransaction = await response.json();

//       // ✅ Update State Immediately
//       setTransaction((prev) => prev ? { ...prev, amount_paid: newAmountPaid, is_completed: newAmountPaid >= prev.total_transaction_price } : updatedTransaction);
//       setAmountPaid(newAmountPaid);

//       // ✅ Success Modal
//       setModalMessage("✅ Payment updated successfully!");
//       setIsErrorModal(false);
//       setModalVisible(true);

//       // ✅ Navigate back after showing the modal
//       setTimeout(() => {
//         setModalVisible(false);
//         navigate("/history");
//       }, 2000);
//     } catch (err: any) {
//       setModalMessage("❌ " + err.message);
//       setIsErrorModal(true);
//       setModalVisible(true);
//     }
//   };

//   if (loading) return <p>Loading transaction...</p>;
//   if (error) return <p>Error: {error}</p>;
//   if (!transaction) return <p>No transaction found.</p>;

//   return (
//     <div className="max-w-4xl mx-auto mt-16 p-6 bg-white shadow-lg rounded-lg">
//       <h1 className="text-2xl font-bold mb-4">Transaction Details</h1>
//       <p><strong>Supplier:</strong> {transaction.id_supplier.supplier_name}</p>
//       <p><strong>Purchase Date:</strong> {new Date(transaction.purchase_date).toLocaleString()}</p>
//       <p><strong>Total Quantity:</strong> {transaction.total_qty}</p>
//       <p><strong>Total Price:</strong> Rp. {transaction.total_transaction_price.toLocaleString()}</p>

//       {transaction.is_completed ? (
//         <p><strong>Amount Paid:</strong> Rp. {transaction.amount_paid.toLocaleString()}</p>
//       ) : (
//         <div className="mt-4">
//           <label className="block font-semibold">Amount Paid:</label>
//           <input
//             type="number"
//             value={amountPaid ?? ""}
//             onChange={(e) => setAmountPaid(parseInt(e.target.value))}
//             className="border p-2 rounded w-full mt-2"
//           />
//           <button
//             onClick={handleUpdatePayment}
//             className="mt-3 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
//           >
//             Update Payment
//           </button>
//         </div>
//       )}

//       <p><strong>Status:</strong> {transaction.is_completed ? "Completed" : "Pending"}</p>

//       <h2 className="text-xl font-bold mt-6">Products</h2>
//       <table className="w-full mt-4 border-collapse border border-gray-300">
//         <thead>
//           <tr className="bg-gray-100">
//             <th className="border border-gray-300 px-4 py-2 text-left">Product Name</th>
//             <th className="border border-gray-300 px-4 py-2 text-center">Quantity</th>
//             <th className="border border-gray-300 px-4 py-2 text-center">Price per Unit</th>
//             <th className="border border-gray-300 px-4 py-2 text-center">Total</th>
//           </tr>
//         </thead>
//         <tbody>
//           {transaction.products.length > 0 ? transaction.products.map((product) => (
//             <tr key={product._id} className="border-b border-gray-300">
//               <td className="border border-gray-300 px-4 py-2">{product.product_name}</td>
//               <td className="border border-gray-300 px-4 py-2 text-center">{product.quantity}</td>
//               <td className="border border-gray-300 px-4 py-2 text-center">Rp. {product.price_per_unit.toLocaleString()}</td>
//               <td className="border border-gray-300 px-4 py-2 text-center">Rp. {(product.quantity * product.price_per_unit).toLocaleString()}</td>
//             </tr>
//           )) : (
//             <tr>
//               <td colSpan={4} className="text-center py-4">No products found.</td>
//             </tr>
//           )}
//         </tbody>
//       </table>

//       <div className="space-x-4">

// {/* ✅ Back Button */}
// <button onClick={() => navigate("/history")} className="mt-6 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700">
//         Back to History
//       </button>

//   {transaction.is_completed && (
//         <button 
//           onClick={handleDownloadPDF} 
//           className="mt-3 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
//         >
//           Download PDF
//         </button>
//       )}

// </div>

//       {/* ✅ Modal for success or error */}
//       {modalVisible && (
//         <div className={`fixed bottom-5 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg ${isErrorModal ? "bg-red-500" : "bg-green-500"} text-white`}>
//           {modalMessage}
//         </div>
//       )}
//     </div>
//   );
// };

// export default TransactionDetails;

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import autoTable from "jspdf-autotable";
import jsPDF from "jspdf";

interface Supplier {
  _id: string;
  supplier_name: string;
}

interface Product {
  id_product: string;
  quantity: number;
  price_per_unit: number;
  _id: string;
  product_name: string;
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
  const navigate = useNavigate();

  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [amountPaid, setAmountPaid] = useState<number | null>(null);
  const [modalMessage, setModalMessage] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [isErrorModal, setIsErrorModal] = useState<boolean>(false);

  useEffect(() => {
    const fetchTransaction = async () => {
      if (!transactionId) return;

      try {
        const response = await fetch(`https://pharmacy-api-roan.vercel.app/api/transaction/${transactionId}`);
        if (!response.ok) throw new Error("Failed to fetch transaction details");

        const data: Transaction = await response.json();
        setTransaction(data);
        setAmountPaid(data.amount_paid);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTransaction();
  }, [transactionId]);

  const handleUpdatePayment = async () => {
    if (!transaction || amountPaid === null) return;

    const remainingBalance = transaction.total_transaction_price - transaction.amount_paid;
    if (amountPaid > remainingBalance) {
      setModalMessage("❌ Amount paid cannot exceed remaining balance.");
      setIsErrorModal(true);
      setModalVisible(true);
      return;
    }

    try {
      const response = await fetch(`https://pharmacy-api-roan.vercel.app/api/transaction/${transaction._id}/amount-paid`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount_paid: amountPaid }),
      });

      if (!response.ok) throw new Error("Failed to update amount paid");

      const updatedTransaction = await response.json();

      setTransaction((prev) => prev ? { ...prev, amount_paid: amountPaid, is_completed: amountPaid >= prev.total_transaction_price } : updatedTransaction);
      setAmountPaid(amountPaid);

      setModalMessage("✅ Payment updated successfully!");
      setIsErrorModal(false);
      setModalVisible(true);

      setTimeout(() => {
        setModalVisible(false);
        navigate("/history");
      }, 2000);
    } catch (err: any) {
      setModalMessage("❌ " + err.message);
      setIsErrorModal(true);
      setModalVisible(true);
    }
  };

  if (loading) return <p>Loading transaction...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!transaction) return <p>No transaction found.</p>;

  return (
    <div className="max-w-4xl mx-auto mt-16 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Transaction Details</h1>
      <p><strong>Supplier:</strong> {transaction.id_supplier.supplier_name}</p>
      <p><strong>Purchase Date:</strong> {new Date(transaction.purchase_date).toLocaleString()}</p>
      <p><strong>Total Quantity:</strong> {transaction.total_qty}</p>
      <p><strong>Total Price:</strong> Rp. {transaction.total_transaction_price.toLocaleString()}</p>

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
          {transaction.products.length > 0 ? transaction.products.map((product) => (
            <tr key={product._id} className="border-b border-gray-300">
              <td className="border border-gray-300 px-4 py-2">{product.product_name}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">{product.quantity}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">Rp. {product.price_per_unit.toLocaleString()}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">Rp. {(product.quantity * product.price_per_unit).toLocaleString()}</td>
            </tr>
          )) : (
            <tr>
              <td colSpan={4} className="text-center py-4">No products found.</td>
            </tr>
          )}
        </tbody>
      </table>

      {!transaction.is_completed && (
        <div className="mt-4">
          <label className="block font-semibold">Amount Paid:</label>
          <input
            type="number"
            value={amountPaid ?? ""}
            onChange={(e) => {
              const inputAmount = parseInt(e.target.value, 10);
              setAmountPaid(isNaN(inputAmount) ? 0 : Math.min(inputAmount, transaction.total_transaction_price - transaction.amount_paid));
            }}
            className="border p-2 rounded w-full mt-2"
          />
          <button
            onClick={handleUpdatePayment}
            className="mt-3 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            Update Payment
          </button>
        </div>
      )}

      {modalVisible && (
        <div className={`fixed bottom-5 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg ${isErrorModal ? "bg-red-500" : "bg-green-500"} text-white`}>
          {modalMessage}
        </div>
      )}
    </div>
  );
};

export default TransactionDetails;
