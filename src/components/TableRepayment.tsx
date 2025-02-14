import { useEffect, useState } from "react";
import { Table, Button } from "flowbite-react";
import { Link } from "react-router-dom";

interface Supplier {
  _id: string;
  supplier_name: string;
}

interface Transaction {
  _id: string;
  id_supplier: Supplier;
  amount_paid: number;
  total_transaction_price: number;
  is_completed: boolean;
  purchase_date: string;
  total_qty: number;
}

export default function TransactionsTable() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    fetch("https://pharmacy-api-roan.vercel.app/api/transaction")
      .then((response) => response.json())
      .then((data: Transaction[]) => {
        // Filter hanya yang `is_completed: false`
        const filteredData = data.filter(transaction => !transaction.is_completed);
  
        // Urutkan berdasarkan purchase_date (DESCENDING)
        const sortedData = filteredData.sort(
          (a, b) => new Date(b.purchase_date).getTime() - new Date(a.purchase_date).getTime()
        );
  
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
              <Table.HeadCell className="text-center">Nama Supplier</Table.HeadCell>
              {/* <Table.HeadCell className="text-center">Total Stok</Table.HeadCell> */}
              <Table.HeadCell className="text-center">Total Transaksi</Table.HeadCell>
              <Table.HeadCell className="text-center">Jumlah Terbayarkan</Table.HeadCell>
              <Table.HeadCell className="text-center">Sisa Hutang</Table.HeadCell>
              {/* <Table.HeadCell className="text-center">Status</Table.HeadCell> */}
              {/* <Table.HeadCell className="text-center">Tanggal Pembelian</Table.HeadCell> */}
              {/* <Table.HeadCell className="text-center">Lain-lain</Table.HeadCell> */}
            </Table.Head>
            <Table.Body className="divide-y">
              {paginatedTransactions.map((transaction) => (
                <Table.Row key={transaction._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell className="text-center text-gray-900">{transaction.id_supplier.supplier_name}</Table.Cell>
                  {/* <Table.Cell className="text-center text-gray-900">{transaction.total_qty} pcs</Table.Cell> */}
                  <Table.Cell className="text-center text-gray-900">Rp. {transaction.total_transaction_price.toLocaleString()}</Table.Cell>
                  <Table.Cell className="text-center text-gray-900">Rp. {transaction.amount_paid.toLocaleString()}</Table.Cell>
                  <Table.Cell className="text-center text-gray-900">Rp. {Math.abs(Number(transaction.amount_paid) - Number(transaction.total_transaction_price)).toLocaleString('id-ID')}</Table.Cell>
                  {/* <Table.Cell className="text-center text-gray-900">{transaction.is_completed ? "Lunas" : "Belum Lunas"}</Table.Cell> */}
                  {/* <Table.Cell className="text-center text-gray-900">{new Date(transaction.purchase_date).toLocaleDateString()}</Table.Cell> */}
                  {/* <Table.Cell>
                  <div className="flex flex-col items-center space-y-2">
                    {!transaction.is_completed && (
                      <Link to={`/historydetail/${transaction._id}`} className="w-36">
                        <Button className="w-full h-10 text-sm whitespace-nowrap">Perbarui Pembayaran</Button>
                      </Link>
                    )}
                  </div>
                  </Table.Cell> */}
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
