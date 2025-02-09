"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button } from "flowbite-react";

interface Product {
  _id: string;
  product_name: string;
  total_quantity: number;
  sell_price: number;
  buy_price: number;
}

export default function Component() {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    axios.get("http://localhost:3000/api/pharmacy_details")
      .then(response => {
        setProducts(response.data); // Assuming API returns an array of products
      })
      .catch(error => {
        console.error("Error fetching products:", error);
      });
  }, []);

  const formatCurrency = (price: number) => {
    return `Rp ${price.toLocaleString("id-ID")}`;
  };

  // Pagination logic
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = products.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="flex">
      <main className="flex-1 ml-48 mt-16 p-4">
        <div className="overflow-x-auto">
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>Product Name</Table.HeadCell>
              <Table.HeadCell>Buy Price</Table.HeadCell>
              <Table.HeadCell>Sell Price</Table.HeadCell>
              <Table.HeadCell>Qty</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {paginatedProducts.map((product) => (
                <Table.Row key={product._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell className="whitespace-nowrap text-gray-900 dark:text-white">
                    {product.product_name}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap text-gray-900 dark:text-white">
                    {formatCurrency(product.buy_price)}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap text-gray-900 dark:text-white">
                    {formatCurrency(product.sell_price)}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap text-gray-900 dark:text-white">
                    {product.total_quantity}
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
