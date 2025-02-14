
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import autoTable from "jspdf-autotable";
import jsPDF from "jspdf";

interface Supplier {
  _id: string;
  supplier_name: string;
  address: string;
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
  amount_paid_history: { amount: number; date: string }[];
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
  const [amountPaid, setAmountPaid] = useState<number>(0);
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
        // Jangan set amountPaid ke amount_paid sebelumnya
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchTransaction();
  }, [transactionId]);

  const handleDownloadProductPDF = () => {
    if (!transaction) return;
  
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16); // Set font size to 12
    doc.text("FAKTUR PEMBELIAN", 120, 15);
  
    // ✅ Add transaction details side by side (Supplier | No Faktur) and (Alamat | Tgl)
    doc.setFont("helvetica", "normal");
    
    const supplierText = `Supplier    : ${transaction.id_supplier.supplier_name}`;
    const alamatText = `Alamat      : ${transaction.id_supplier.address}`; // Replace with actual address field if available
    const noFakturText = `No Faktur       : ${transaction._id}`;
    const tglText = `Tanggal          : ${new Date(transaction.purchase_date).toLocaleDateString()}`;
  
    // First row (Supplier side by side with No Faktur)
    doc.setFontSize(12); // Set font size to 12
    doc.text(supplierText, 14, 30);
    doc.text(noFakturText, 120, 30);  // Adjust the X position as needed
  
    // Second row (Alamat side by side with Tgl)
    doc.text(alamatText, 14, 40);
    doc.text(tglText, 120, 40); // Adjust the X position as needed
  
    // ✅ Add product table
// Calculate the subtotal
const subtotal = transaction.products.reduce((sum, product) => {
  return sum + (product.quantity * product.price_per_unit);
}, 0);

// Generate the table with borders but no background color
autoTable(doc, {
  startY: 50, // Start after the transaction details
  head: [["Nama Barang", "Qty", "Harga Satuan", "Total"]],
  body: [
    ...transaction.products.map(product => [
      product.product_name,
      product.quantity,
      `Rp. ${product.price_per_unit.toLocaleString()}`,
      `Rp. ${(product.quantity * product.price_per_unit).toLocaleString()}`
    ]),
    // Adding subtotal row with no background color
    [
      '', // Empty column
      '', // Empty column
      'Subtotal', // Subtotal label
      `Rp. ${subtotal.toLocaleString()}` // Subtotal value
    ]
  ],
  theme: 'grid', // Use a grid theme for cleaner look
  headStyles: {
    fillColor: [255, 255, 255], // No background color for header (white)
    textColor: [0, 0, 0], // Black text color
    fontStyle: 'bold', // Bold font for header text
    halign: 'center', // Center the header text
    valign: 'middle', // Vertically align the header text
  },
  bodyStyles: {
    fontSize: 10, // Smaller font size for table body
    valign: 'middle', // Vertically align the body text
    cellPadding: 5, // Add padding for cells
  },
  columnStyles: {
    0: { cellWidth: 'auto', halign: 'center' }, // Column 1 styles
    1: { cellWidth: 'auto', halign: 'center' }, // Column 2 styles
    2: { cellWidth: 'auto', halign: 'center' }, // Column 3 styles
    3: { cellWidth: 'auto', halign: 'center' }, // Column 4 styles
  },
  styles: {
    cellWidth: 'auto', // Auto-adjust cell width based on content
    overflow: 'linebreak', // Allow text to wrap in cells
    halign: 'center', // Center align text in cells
    valign: 'middle', // Vertically align text in cells
    font: 'helvetica', // Use Helvetica font
    fontSize: 10, // Set font size
    fillColor: [255, 255, 255], // No background color for cells
    lineWidth: 0.1, // Border line width
    lineColor: [0, 0, 0], // Border line color (black)
  }
});

// ✅ Save the PDF
doc.save("transaction_details.pdf");

  };
  
  const handleDownloadPaymentPDF = () => {
    if (!transaction) return;
  
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("FAKTUR PEMBAYARAN", 105, 15, { align: "center" });
  
    // ✅ Transaction details (Supplier | No Faktur) and (Alamat | Tgl)
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
  
    const supplierText = `Supplier    : ${transaction.id_supplier.supplier_name}`;
    const alamatText = `Alamat      : ${transaction.id_supplier.address}`;
    const noFakturText = `No Faktur   : ${transaction._id}`;
    const tglText = `Tanggal     : ${new Date(transaction.purchase_date).toLocaleDateString()}`;
  
    doc.text(supplierText, 14, 30);
    doc.text(noFakturText, 120, 30);
    doc.text(alamatText, 14, 40);
    doc.text(tglText, 120, 40);
  
    const paymentHistory = transaction.amount_paid_history;
    const totalBayar = transaction.total_transaction_price; // Total amount to be paid
    const totalPaid = paymentHistory.reduce((sum, payment) => sum + payment.amount, 0); // Total amount paid
    const remainingBalance = totalBayar - totalPaid; // Remaining amount to be paid
  
    let nextY = 50;
  
    if (paymentHistory.length === 0) {
      doc.text("No payment history found.", 14, nextY);
    } else {
      // ✅ Generate Payment History Table
      autoTable(doc, {
        startY: nextY,
        head: [["Tanggal Bayar", "Jumlah Pembayaran"]],
        body: paymentHistory.map(payment => [
          new Date(payment.date).toLocaleDateString(),
          `Rp. ${payment.amount.toLocaleString()}`
        ]),
        theme: "grid",
        headStyles: {
          fillColor: [230, 230, 230], // Light gray header
          textColor: [0, 0, 0],
          fontStyle: "bold",
          halign: "center",
        },
        bodyStyles: {
          fontSize: 10,
          valign: "middle",
          cellPadding: 5,
        },
        columnStyles: {
          0: { cellWidth: "auto", halign: "center" },
          1: { cellWidth: "auto", halign: "right" },
        },
        styles: {
          cellWidth: "auto",
          overflow: "linebreak",
          halign: "center",
          valign: "middle",
          font: "helvetica",
          fontSize: 10,
          lineWidth: 0.1,
          lineColor: [0, 0, 0],
        },
      });
  
      nextY = (doc as any).lastAutoTable?.finalY + 10 || 50; // ✅ Corrected
  
      // ✅ Display Total Bayar (Total Amount Due) and Remaining Balance
      doc.text(`Jumlah Pembayaran                 : Rp. ${totalPaid.toLocaleString()}`, 100, nextY);
      doc.text(`Total yang harus dibayar          : Rp. ${totalBayar.toLocaleString()}`, 100, nextY + 7);
      doc.text(`Sisa Pembayaran                   : Rp. ${remainingBalance.toLocaleString()}`, 100, nextY + 14);
    }
  
    // ✅ Save the PDF
    doc.save("payment_history.pdf");
  };
  
  
  


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
    <div className="max-w-4xl mx-auto mt-16 p-12 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Detail Transaksi</h1>
      <p><strong>Nama Supplier:</strong> {transaction.id_supplier.supplier_name}</p>
      <p><strong>Tanggal Pembelian:</strong> {new Date(transaction.purchase_date).toLocaleString()}</p>
      <p><strong>Total Stok:</strong> {transaction.total_qty} pcs</p>
      <p><strong>Total Harga:</strong> Rp. {transaction.total_transaction_price.toLocaleString()}</p>
      <p><strong>Status:</strong> {transaction.is_completed ? "Lunas" : "Belum Lunas"}</p>

    

<h2 className="text-xl font-bold mt-6">Barang-barang</h2>
<table className="w-full mt-4 border-collapse border border-gray-300">
  <thead>
    <tr className="bg-gray-100">
      <th className="border border-gray-300 px-4 py-2 text-left">Nama Produk</th>
      <th className="border border-gray-300 px-4 py-2 text-center">Stok</th>
      <th className="border border-gray-300 px-4 py-2 text-center">Harga Satuan</th>
      <th className="border border-gray-300 px-4 py-2 text-center">Total</th>
    </tr>
  </thead>
  <tbody>
    {transaction.products.length > 0 ? transaction.products.map((product) => (
      <tr key={product._id} className="border-b border-gray-300">
        <td className="border border-gray-300 px-4 py-2">{product.product_name}</td>
        <td className="border border-gray-300 px-4 py-2 text-center">{product.quantity} pcs</td>
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

<h2 className="text-xl font-bold mt-6">Riwayat Jumlah yang Dibayar</h2>
<table className="w-full mt-4 border-collapse border border-gray-300">
<thead>
<tr className="bg-gray-100">
<th className="border border-gray-300 px-4 py-2 text-center">Tanggal</th>
<th className="border border-gray-300 px-4 py-2 text-center">Jumlah</th>
</tr>
</thead>
<tbody>
{transaction.amount_paid_history.length > 0 ? (
<>
  {transaction.amount_paid_history.map((payment, index) => (
    <tr key={index} className="border-b border-gray-300">
      <td className="border border-gray-300 px-4 py-2 text-center">
        {new Date(payment.date).toLocaleDateString()}
      </td>
      <td className="border border-gray-300 px-4 py-2 text-center">
        Rp. {payment.amount.toLocaleString()}
      </td>
    </tr>
  ))}
  <tr className="bg-gray-200 font-bold">
    <td className="border border-gray-300 px-4 py-2 text-center">Jumlah Total Pembayaran</td>
    <td className="border border-gray-300 px-4 py-2 text-center">
      Rp. {transaction.amount_paid_history.reduce((sum, payment) => sum + payment.amount, 0).toLocaleString()}
    </td>
  </tr>
</>
) : (
<tr>
  <td colSpan={2} className="text-center py-4">
  Tidak ditemukan riwayat pembayaran.</td>
</tr>
)}
</tbody>
</table>

<div className="space-x-4">

{transaction.is_completed ? (


<div className="flex justify-between mt-8 space-x-4">
  {/* ✅ Back Button */}
  <button 
    onClick={() => navigate("/history")} 
    className="mt-3 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
  >
    Back to History
  </button>

  <div className="space-x-2 flex"> 
    <button 
      onClick={handleDownloadProductPDF} 
        className="mt-3 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 flex items-center space-x-2"
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="18" 
        height="18" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
        <polyline points="7 10 12 15 17 10"/>
        <line x1="12" x2="12" y1="15" y2="3"/>
      </svg>
      <span>Produk PDF</span>
    </button>
    
    <button 
      onClick={handleDownloadPaymentPDF} 
      className="mt-3 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 flex items-center space-x-2"
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="18" 
        height="18" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
        <polyline points="7 10 12 15 17 10"/>
        <line x1="12" x2="12" y1="15" y2="3"/>
      </svg>
      <span>Pembayaran PDF</span>
    </button>
  </div>
</div>



) : (

  <div> 
{/* ✅ Menampilkan Sisa Hutang */}
<div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mt-4">
  <p><strong>Sisa Hutang:</strong> Rp. {(
    transaction.total_transaction_price - transaction.amount_paid
  ).toLocaleString()}</p>
</div>
    <div className="mt-4">
    <label className="block font-semibold">Masukkan Jumlah Pembayaran:</label>
      <input
  type="text"
  value={amountPaid === 0 ? "" : `Rp. ${amountPaid.toLocaleString("id-ID")}`}

  onChange={(e) => {
    // Hanya ambil angka
    const rawValue = e.target.value.replace(/\D/g, ""); 
    const inputAmount = parseInt(rawValue, 10) || 0;

    // Tetap mulai dari 0 dan batasi jumlah pembayaran
    setAmountPaid(Math.min(inputAmount, transaction.total_transaction_price - transaction.amount_paid));
  }}
  placeholder="Rp. 0"
  className="border p-2 rounded w-full mt-2"
/>
   
  </div>
  <div className="flex justify-between space-x-4"> {/* Add space between the buttons */}

  <button 
    onClick={() => navigate("/repayment")} 
    className="mt-3 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
  >
    Kembali
  </button>

    <button
      onClick={handleUpdatePayment}
      className="mt-3 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
    >
      Perbarui Pembayaran
    </button>
  </div>
  </div>
)}



</div>

{modalVisible && (
  <div className={`fixed bottom-5 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg ${isErrorModal ? "bg-red-500" : "bg-green-500"} text-white`}>
    {modalMessage}
  </div>
)}

{/* ✅ Modal for success or error */}
{modalVisible && (
  <div className={`fixed bottom-5 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg ${isErrorModal ? "bg-red-500" : "bg-green-500"} text-white`}>
    {modalMessage}
  </div>
)}

    </div>
  );
};

export default TransactionDetails;
