// import { useEffect, useState } from "react";
// import { Table, Button } from "flowbite-react";
// import { Link } from "react-router-dom";

// interface Supplier {
//   _id: string;
//   supplier_name: string;
// }

// interface Transaction {
//   _id: string;
//   id_supplier: Supplier;
//   amount_paid: number;
//   total_transaction_price: number;
//   is_completed: boolean;
//   purchase_date: string;
//   total_qty: number;
// }

// export default function TransactionsTable() {
//   const [transactions, setTransactions] = useState<Transaction[]>([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 5;

//   useEffect(() => {
//     fetch("https://pharmacy-api-roan.vercel.app/api/transaction")
//       .then((response) => response.json())
//       .then((data: Transaction[]) => setTransactions(data))
//       .catch((error) => console.error("Error fetching transactions:", error));
//   }, []);

//   const totalPages = Math.ceil(transactions.length / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const paginatedTransactions = transactions.slice(startIndex, startIndex + itemsPerPage);

//   return (
//     <div className="flex">
//       <main className="flex-1 ml-48 mt-16 p-4">
//         <h2 className="text-2xl font-semibold mb-4">Transactions</h2>
//         <div className="overflow-x-auto">
//           <Table hoverable>
//             <Table.Head>
//               <Table.HeadCell>Supplier Name</Table.HeadCell>
//               <Table.HeadCell>Total Quantity</Table.HeadCell>
//               <Table.HeadCell>Total Transaction Price</Table.HeadCell>
//               <Table.HeadCell>Amount Paid</Table.HeadCell>
//               <Table.HeadCell>Status</Table.HeadCell>
//               <Table.HeadCell>Purchase Date</Table.HeadCell>
//               <Table.HeadCell>Other</Table.HeadCell>
//             </Table.Head>
//             <Table.Body className="divide-y">
//               {paginatedTransactions.map((transaction) => (
//                 <Table.Row key={transaction._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
//                   <Table.Cell>{transaction.id_supplier.supplier_name}</Table.Cell>
//                   <Table.Cell>{transaction.total_qty}</Table.Cell>
//                   <Table.Cell>Rp. {transaction.total_transaction_price.toLocaleString()}</Table.Cell>
//                   <Table.Cell>Rp. {transaction.amount_paid.toLocaleString()}</Table.Cell>
//                   <Table.Cell>{transaction.is_completed ? "Completed" : "Not Fully Paid"}</Table.Cell>
//                   <Table.Cell>{new Date(transaction.purchase_date).toLocaleDateString()}</Table.Cell>
//                   <Table.Cell>
//                     <div className="flex space-x-2">
//                       <Link to={`/historydetail/${transaction._id}`}>
//                         <Button>Detail</Button>
//                       </Link>
//                       {!transaction.is_completed && (
//                         <Link to={`/historydetail/${transaction._id}`}>
//                           <Button>Update Payment</Button>
//                         </Link>
//                       )}
//                     </div>
//                   </Table.Cell>
//                 </Table.Row>
//               ))}
//             </Table.Body>
//           </Table>
//           {/* Pagination Controls */}
//           <div className="flex justify-between items-center mt-4">
//             <Button 
//               onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} 
//               disabled={currentPage === 1}
//             >
//               Previous
//             </Button>
//             <span className="text-gray-900 dark:text-white">
//               Page {currentPage} of {totalPages}
//             </span>
//             <Button 
//               onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} 
//               disabled={currentPage === totalPages}
//             >
//               Next
//             </Button>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }
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
        // Urutkan data berdasarkan purchase_date (DESCENDING)
        const sortedData = data.sort(
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
        <h2 className="text-2xl font-semibold mb-4">Transactions</h2>
        <div className="overflow-x-auto">
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell className="text-center">Supplier Name</Table.HeadCell>
              <Table.HeadCell className="text-center">Total Quantity</Table.HeadCell>
              <Table.HeadCell className="text-center">Total Transaction Price</Table.HeadCell>
              <Table.HeadCell className="text-center">Amount Paid</Table.HeadCell>
              <Table.HeadCell className="text-center">Status</Table.HeadCell>
              <Table.HeadCell className="text-center">Purchase Date</Table.HeadCell>
              <Table.HeadCell className="text-center">Other</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {paginatedTransactions.map((transaction) => (
                <Table.Row key={transaction._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell className="text-center">{transaction.id_supplier.supplier_name}</Table.Cell>
                  <Table.Cell className="text-center">{transaction.total_qty}</Table.Cell>
                  <Table.Cell className="text-center">Rp. {transaction.total_transaction_price.toLocaleString()}</Table.Cell>
                  <Table.Cell className="text-center">Rp. {transaction.amount_paid.toLocaleString()}</Table.Cell>
                  <Table.Cell className="text-center">{transaction.is_completed ? "Completed" : "Not Fully Paid"}</Table.Cell>
                  <Table.Cell className="text-center">{new Date(transaction.purchase_date).toLocaleDateString()}</Table.Cell>
                  <Table.Cell>
                  <div className="flex space-x-2">
  <Link to={`/historydetail/${transaction._id}`} className="w-36">
    <Button className="w-full h-10 text-sm">Detail</Button>
  </Link>
  {!transaction.is_completed && (
    <Link to={`/historydetail/${transaction._id}`} className="w-36">
      <Button className="w-full h-10 text-sm whitespace-nowrap">Update Payment</Button>
    </Link>
  )}
</div>

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
              Previous
            </Button>
            <span className="text-gray-900 dark:text-white">
              Page {currentPage} of {totalPages}
            </span>
            <Button 
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} 
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
