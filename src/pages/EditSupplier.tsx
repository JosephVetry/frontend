import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import axios from "axios";

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
  const [showSuccessModal, setShowSuccessModal] = useState(false);

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
    axios
      .get(`https://pharmacy-api-roan.vercel.app/api/supplier/${supplierId}/product`)
      .then((response) => {
        setSupplier(response.data);
        console.log(response.data)
      })
      .catch((error) => {
        console.error("Error fetching supplier:", error);
      });
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

  const handleAddProduct = () => {
    setSupplier({
      ...supplier,
      products: [...supplier.products, { _id: "", name: "", price: 0 }],
    });
  };

  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  
    const token = localStorage.getItem("token"); // ✅ Retrieve token from localStorage
  
    // Transform data to match the required format
    const updatedSupplier = {
      _id: supplier._id,
      supplier_name: supplier.name, 
      address: supplier.address,
      phone: supplier.phone,
      products: supplier.products.map((product) => ({
        _id: product._id,
        name: product.name,
        price: product.price,
      })),
    };
  
    console.log(updatedSupplier);
    console.log(token)
    axios
      .put(
        `https://pharmacy-api-roan.vercel.app/api/supplier/${supplierId}/edit-supplier`,
        updatedSupplier,
        {
          headers: {
            Authorization: `${token}`, // ✅ Attach token in headers
          },
        }
      )
      .then(() => {
        setShowSuccessModal(true);
        setTimeout(() => {
          setShowSuccessModal(false);
          navigate("/supplier"); // Redirect after success
        }, 2000);
      })
      .catch((error) => {
        console.error("Masalah ketika perbarui supplier:", error);
      });
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
              <label className="block text-sm font-medium text-gray-700">Nama</label>
              <input
                type="text"
                name="name"
                value={supplier.name}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Alamat</label>
              <input
                type="text"
                name="address"
                value={supplier.address}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Nomor Telepon</label>
              <input
                type="text"
                name="phone"
                value={supplier.phone}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
              />
            </div>
      
            <div className="mb-4">
  <label className="block text-sm font-medium text-gray-700">Produk</label>
  {supplier.products.map((product, index) => (
  <div key={index} className="mb-2 gap-2 flex items-center">
    <input
      type="text"
      name="name"
      value={product.name}
      onChange={(e) => handleChange(e, index)}
      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
      placeholder="Product Name"
      readOnly={!!product._id} // Readonly if the product has an ID (existing product)
    />
    <input
      type="text"
      value={product.price === 0 ? "" : `Rp. ${product.price.toLocaleString("id-ID")}`}
      onChange={(e) => handlePriceChange(e, index)}
      placeholder="Rp. 0"
      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
      readOnly={!!product._id} // Readonly if the product has an ID (existing product)
    />
    <button
      type="button"
      onClick={() => handleDeleteProduct(index)}
      className="ml-2 px-2 py-1 bg-red-600 text-white rounded-md"
    >
      Hapus
    </button>
  </div>
))}

  <button
    type="button"
    onClick={handleAddProduct}
    className="mt-2 px-4 py-2 bg-green-600 text-white rounded-md"
  >
    + Tambah Produk
  </button>
</div>

            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md"
            >
              Simpan
            </button>
          </form>
          {/* Success Modal */}
          {showSuccessModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="rounded-lg bg-green-500 p-4 text-white shadow-lg">
                Data berhasil di perbarui
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
