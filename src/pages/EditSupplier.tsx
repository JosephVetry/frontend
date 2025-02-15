import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

interface Product {
  _id: string;
  name: string;
  price: number;
}

interface Supplier {
  _id: string;
  name: string;
  address: string;
  phone: string;
  products: Product[];
}

export default function EditSupplier() {
  const navigate = useNavigate();
  const { supplierId } = useParams<{ supplierId: string }>();
  const [supplier, setSupplier] = useState<Supplier>({
    _id: "",
    name: "",
    address: "",
    phone: "",
    products: [{ _id: "", name: "", price: 0 }]
  });

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (!isLoggedIn) {
      // Redirect ke halaman login dan hapus riwayat navigasi
      navigate("/", { replace: true });
      window.history.replaceState(null, "", "/");
    }
  }, [navigate]);

  useEffect(() => {
    console.log(supplierId);
    // Fetch supplier data here and set it to state
    // Example:
    fetch(`http://localhost:3000/api/supplier/${supplierId}/product`)
      .then(response => response.json())
      .then(data => setSupplier(data));
  }, [supplierId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index?: number) => {
    const { name, value } = e.target;
    if (index !== undefined) {
      const updatedProducts = [...supplier.products];
      updatedProducts[index] = { ...updatedProducts[index], [name]: value };
      setSupplier({ ...supplier, products: updatedProducts });
    } else {
      setSupplier({ ...supplier, [name]: value });
    }
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const rawValue = e.target.value.replace(/\D/g, "");
    const inputAmount = parseInt(rawValue, 10);
    const newAmount = isNaN(inputAmount) ? 0 : inputAmount;

    const updatedProducts = [...supplier.products];
    updatedProducts[index] = { ...updatedProducts[index], price: newAmount };
    setSupplier({ ...supplier, products: updatedProducts });
  };

  const handleDeleteProduct = (index: number) => {
    const updatedProducts = supplier.products.filter((_, i) => i !== index);
    setSupplier({ ...supplier, products: updatedProducts });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(supplier);
    // Submit updated supplier data here
    // Example:
    // fetch(`/api/suppliers/${supplierId}`, {
    //   method: 'PUT',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(supplier)
    // }).then(() => navigate('/suppliers'));
  };

  return (
    <div>
      <Navbar />
      <Sidebar />
      <div className="flex justify-center items-center min-h-screen">
        <main className="flex-1 ml-48 mt-16 p-4 max-w-2xl">
          <h2 className="mb-4 text-2xl font-semibold">Edit Supplier</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={supplier.name}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <input
                type="text"
                name="address"
                value={supplier.address}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <input
                type="text"
                name="phone"
                value={supplier.phone}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Products</label>
              {supplier.products.map((product, index) => (
                <div key={product._id} className="mb-2 gap-2 flex items-center">
                  <input
                    type="text"
                    name="name"
                    value={product.name}
                    onChange={(e) => handleChange(e, index)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm mb-1"
                    placeholder="Product Name"
                  />
                  <input
                    type="text"
                    value={product.price === 0 ? "" : `Rp. ${product.price.toLocaleString("id-ID")}`}
                    onChange={(e) => handlePriceChange(e, index)}
                    placeholder="Rp. 0"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                  />
                  <button
                    type="button"
                    onClick={() => handleDeleteProduct(index)}
                    className="ml-2 px-2 py-1 bg-red-600 text-white rounded-md"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md"
            >
              Save
            </button>
          </form>
        </main>
      </div>
    </div>
  );
}
