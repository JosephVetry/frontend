"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button } from "flowbite-react";
import { Link } from "react-router-dom";
import AddButton from "./Button";
import { IoMdCart } from "react-icons/io";
import { RiEdit2Line } from "react-icons/ri";
import { AiFillDelete } from "react-icons/ai";
interface Supplier {
  _id: string;
  supplier_name: string;
  address: string;
  phone_number: string;
}

export default function Component() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const itemsPerPage = 5;

  useEffect(() => {
    axios
      .get("https://pharmacy-api-roan.vercel.app/api/supplier")
      .then((response) => {
        setSuppliers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching suppliers:", error);
      });
  }, []);

  // Function to delete a supplier
  const clickDelete = async () => {
    try {
      await axios.delete(
        `https://pharmacy-api-roan.vercel.app/api/supplier/${deleteId}`,
      );
      setSuppliers(suppliers.filter((supplier) => supplier._id !== deleteId));
      setDeleteId(null); // Close modal after deleting
    } catch (error) {
      console.error("Error deleting supplier:", error);
    }
  };

  // Pagination logic
  const totalPages = Math.ceil(suppliers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedSuppliers = suppliers.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  return (
    <div className="flex items-center ">
      <main className="ml-48 mt-16 flex-1 p-4">
        <h2 className="mb-4 text-2xl font-semibold">Supplier</h2>
        <div className="overflow-x-auto">
          <div className="mb-2 flex justify-between">
            <AddButton />
            <div className="mr-12 mt-6">
              Total Supplier : {suppliers.length}
            </div>
          </div>
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell className="text-center">
                Nama Supplier
              </Table.HeadCell>
              <Table.HeadCell className="text-center">Alamat</Table.HeadCell>
              <Table.HeadCell className="text-center">
                Nomor Telepon
              </Table.HeadCell>
              <Table.HeadCell className="text-center">Lain-lain</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {paginatedSuppliers.map((supplier) => (
                <Table.Row
                  key={supplier._id}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <Table.Cell className="text-center text-gray-900">
                    {supplier.supplier_name}
                  </Table.Cell>
                  <Table.Cell className="text-center text-gray-900">
                    {supplier.address}
                  </Table.Cell>
                  <Table.Cell className="text-center text-gray-900">
                    {supplier.phone_number}
                  </Table.Cell>
                  <Table.Cell className="text-gray-900">
                    <div className="flex items-center justify-center gap-2">
                      {/* Tombol Beli */}
                      <Link to={`/detailtransaksi/${supplier._id}`}>
                        <Button className="rounded-lg bg-green-500 text-white transition hover:bg-green-600">
                          <div className="flex items-center gap-1">
                            <IoMdCart />
                            <span>Beli</span>
                          </div>
                        </Button>
                      </Link>

                      {/* Tombol Edit Supplier */}
                      <Link to={`/editsupplier/${supplier._id}`}>
                        <Button className="rounded-lg bg-yellow-500 text-white transition hover:bg-green-600">
                          <div className="flex items-center gap-1">
                            <RiEdit2Line />
                            <span>Edit</span>
                          </div>
                        </Button>
                      </Link>
                      {/* Tombol Delete Supplier */}

                      <Button
                        onClick={() => setDeleteId(supplier._id)}
                        className="rounded-lg bg-red-700 text-white transition hover:bg-red-800"
                      >
                        <div className="flex items-center gap-1">
                          <AiFillDelete />
                          <span>Delete</span>
                        </div>
                      </Button>
                    </div>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>

          {/* Delete Confirmation Modal */}
          {deleteId && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="rounded-lg bg-white p-6 shadow-lg">
                <h2 className="mb-4 text-lg font-semibold">Confirm Delete</h2>
                <p>Are you sure you want to delete this supplier?</p>
                <div className="mt-4 flex justify-end gap-3">
                  <Button
                    onClick={clickDelete}
                    className="rounded-lg bg-red-700 px-4 py-2 text-white transition hover:bg-red-800"
                  >
                    Yes, Delete
                  </Button>
                  <Button
                    onClick={() => setDeleteId(null)}
                    className="rounded-lg bg-gray-500 px-4 py-2 text-white transition hover:bg-gray-600"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Pagination Controls */}
          <div className="mt-4 flex items-center justify-between">
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
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
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
