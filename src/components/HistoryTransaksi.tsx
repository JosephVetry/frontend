"use client";

import { Table, Button } from "flowbite-react";
import { Link } from "react-router-dom";

export default function Component() {
  return (
    <div className="flex">
        <main className="flex-1 ml-48 mt-16 p-4">
        <div className="overflow-x-auto">
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>Supplier Name</Table.HeadCell>
              <Table.HeadCell>Address</Table.HeadCell>
              <Table.HeadCell>Phone Number</Table.HeadCell>
              <Table.HeadCell>
                <span className="sr-only">Beli</span>
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell>Distributor A</Table.Cell>
                <Table.Cell>3211 wellness road, houston</Table.Cell>
                <Table.Cell>222333444555666</Table.Cell>
                <Table.Cell>
                  <Link to="/detailtransaksi">
                    <Button>Detail</Button>
                  </Link>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </div>
      </main>
    </div>
  );
}
