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
              <Table.HeadCell>Total Quantity</Table.HeadCell>
              <Table.HeadCell>Total Transaction Price</Table.HeadCell>
              <Table.HeadCell>Amount Paid</Table.HeadCell>
              <Table.HeadCell>Status</Table.HeadCell>
              <Table.HeadCell>Other</Table.HeadCell>
              <Table.HeadCell>
                <span className="sr-only">Beli</span>
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell>Distributor A</Table.Cell>
                <Table.Cell>3</Table.Cell>
                <Table.Cell>Rp. 300000</Table.Cell>
                <Table.Cell>Rp. 300000</Table.Cell>
                <Table.Cell>Completed Paid</Table.Cell>
                <Table.Cell>
                  <div className="flex space-x-2">
                    {/* <Link to="/#">
                      <Button>Update Payment</Button>
                    </Link> */}
                    <Link to="/historydetail">
                      <Button>Detail</Button>
                    </Link>
                  </div>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
            <Table.Body className="divide-y">
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell>Distributor B</Table.Cell>
                <Table.Cell>6</Table.Cell>
                <Table.Cell>Rp. 600000</Table.Cell>
                <Table.Cell>Rp. 500000</Table.Cell>
                <Table.Cell>Not Fully Paid</Table.Cell>
                <Table.Cell>
                  <div className="flex space-x-2">
                    <Link to="/historydetail">
                      <Button>Detail</Button>
                    </Link>
                    <Link to="/#">
                      <Button>Update Payment</Button>
                    </Link>
                  </div>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </div>
      </main>
    </div>
  );
}
