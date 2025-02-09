"use client";

import { Table } from "flowbite-react";

export default function Component() {
  return (
    <div className="flex">
      <main className="flex-1 ml-48 mt-16 p-4">
        <div className="overflow-x-auto">
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>Product name</Table.HeadCell>
              <Table.HeadCell>Price</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell>Paracetamol</Table.Cell>
                <Table.Cell>5000</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </div>
      </main>
    </div>
  );
}
