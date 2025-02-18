import { useEffect, useState } from "react";
import { Table, Button } from "flowbite-react";

interface Supplier {
  _id: string;
  supplier_name: string;
}

interface Transaction {
  _id: string;
  id_supplier: Supplier;
  amount_paid: number;
  total_transaction_price: number;
  purchase_date: string;
  total_qty: number;
  remaining_debt: number;
}

export default function TransactionsTable() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    fetch("https://pharmacy-api-roan.vercel.app/api/transaction")
      .then((response) => response.json())
      .then((data: Transaction[]) => {
        // Filter out transactions where id_supplier is missing
        const validTransactions = data.filter(transaction => transaction.id_supplier);
  
        // Hitung sisa hutang dan tambahkan sebagai properti baru
        const transactionsWithDebt = validTransactions.map(transaction => ({
          ...transaction,
          remaining_debt: Math.max(0, transaction.total_transaction_price - transaction.amount_paid)
        }));
  
        // Urutkan berdasarkan No. Faktur (_id) secara ascending
        const sortedData = transactionsWithDebt.sort((a, b) => a._id.localeCompare(b._id));
  
        setTransactions(sortedData);
      })
      .catch((error) => console.error("Error fetching transactions:", error));
  }, []);
  

  const totalPages = Math.ceil(transactions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTransactions = transactions.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="flex">
      <main className="flex-1 ml-48 mt-16 p-4">
        <h2 className="text-2xl font-semibold mb-4">Data Hutang</h2>
        <div className="overflow-x-auto">
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell className="text-center">No. Faktur</Table.HeadCell>
              <Table.HeadCell className="text-center">Nama Supplier</Table.HeadCell>
              <Table.HeadCell className="text-center">Total Transaksi</Table.HeadCell>
              <Table.HeadCell className="text-center">Jumlah Terbayarkan</Table.HeadCell>
              <Table.HeadCell className="text-center">Sisa Hutang</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {paginatedTransactions.map((transaction) => (
                <Table.Row key={transaction._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell className="text-center text-gray-900">{transaction._id}</Table.Cell>
                  {transaction.id_supplier && (
  <Table.Cell className="text-center text-gray-900">
    {transaction.id_supplier.supplier_name}
  </Table.Cell>
)}

                  <Table.Cell className="text-center text-gray-900">Rp. {transaction.total_transaction_price.toLocaleString()}</Table.Cell>
                  <Table.Cell className="text-center text-gray-900">Rp. {transaction.amount_paid.toLocaleString()}</Table.Cell>
                  <Table.Cell className={`text-center font-semibold ${transaction.remaining_debt === 0 ? "text-green-600" : "text-red-600"}`}>
                    Rp. {transaction.remaining_debt.toLocaleString()}
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>

          {/* Pagination Controls */}
          <div className="flex justify-between items-center mt-4">
            <Button 
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} 
              disabled={currentPage === 1}
            >
              Sebelumnya
            </Button>
            <span className="text-gray-900 dark:text-white">
              Halaman {currentPage} dari {totalPages}
            </span>
            <Button 
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} 
              disabled={currentPage === totalPages}
            >
              Selanjutnya
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
