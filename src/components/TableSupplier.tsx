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

  useEffect(() => {
    axios.get("http://localhost:3000/api/supplier")
      .then((response) => {
        setSuppliers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching suppliers:", error);
      });
  }, []);

  return (
    <div className="flex">
      <main className="flex-1 ml-48 mt-16 p-4">
      <h2 className="text-2xl font-semibold mb-4"> Supplier</h2>
        <div className="overflow-x-auto">
          <div className="flex mb-2">
            <AddButton />
          </div>
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>Supplier Name</Table.HeadCell>
              <Table.HeadCell>Address</Table.HeadCell>
              <Table.HeadCell>Phone Number</Table.HeadCell>
              <Table.HeadCell>
                <span className="sr-only">Buy</span>
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {suppliers.map((supplier) => (
                <Table.Row key={supplier._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell>{supplier.supplier_name}</Table.Cell>
                  <Table.Cell>{supplier.address}</Table.Cell>
                  <Table.Cell>{supplier.phone_number}</Table.Cell>
                  <Table.Cell>
                  <Link to={`/detailtransaksi/${supplier._id}`}>
  <Button>Buy</Button>
</Link>

                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      </main>
    </div>
  );
}
