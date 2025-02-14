"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button } from "flowbite-react";
import { Link } from "react-router-dom";
import AddButton from "./Button";

interface Supplier {
  _id: string;
  supplier_name: string;
  address: string;
  phone_number: string;
}

export default function Component() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    axios.get("https://pharmacy-api-roan.vercel.app/api/supplier")
      .then((response) => {
        setSuppliers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching suppliers:", error);
      });
  }, []);

  // Pagination logic
  const totalPages = Math.ceil(suppliers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedSuppliers = suppliers.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="flex">
      <main className="flex-1 ml-48 mt-16 p-4">
        <h2 className="text-2xl font-semibold mb-4">Supplier</h2>
        <div className="overflow-x-auto">
          <div className="flex mb-2">
            <AddButton />
          </div>
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>Nama Supplier</Table.HeadCell>
              <Table.HeadCell>Alamat</Table.HeadCell>
              <Table.HeadCell>Nomor Telepon</Table.HeadCell>
              <Table.HeadCell >Lain-lain</Table.HeadCell>
           
            </Table.Head>
            <Table.Body className="divide-y">
              {paginatedSuppliers.map((supplier) => (
                <Table.Row key={supplier._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell>{supplier.supplier_name}</Table.Cell>
                  <Table.Cell>{supplier.address}</Table.Cell>
                  <Table.Cell>{supplier.phone_number}</Table.Cell>
                  <Table.Cell >
  <Link className="flex items-center" to={`/detailtransaksi/${supplier._id}`}>
  <Button>
     <div className="flex items-center gap-2">
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
        <circle cx="8" cy="21" r="1"/>
        <circle cx="19" cy="21" r="1"/>
        <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
      </svg>
      <span>Beli</span>
     </div>
    </Button>
  </Link>
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
