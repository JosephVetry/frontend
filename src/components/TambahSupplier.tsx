import { useState } from "react";
import { Textarea, TextInput, Label, Button, Modal } from "flowbite-react";
import { useNavigate } from "react-router-dom";

interface Product {
  product_name: string;
  sell_price: number; // Change to number
}

interface FormData {
  supplier_name: string;
  phone_number: string;
  address: string;
  products: Product[];
}

const RegistrationForm = () => {
  const [formData, setFormData] = useState<FormData>({
    supplier_name: "",
    phone_number: "",
    address: "",
    products: [{ product_name: "", sell_price: 0 }], // Initialize as number
  });

  const [message, setMessage] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const formatRupiah = (value: number) => {
    return new Intl.NumberFormat("id-ID").format(value);
  };

  const handleProductChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedProducts = [...formData.products];

    if (name === "sell_price") {
      // Convert to number directly
      const numericValue = parseInt(value.replace(/[^0-9]/g, ""), 10) || 0;

      updatedProducts[index] = {
        ...updatedProducts[index],
        sell_price: numericValue, // Store as number
      };
    } else {
      updatedProducts[index] = {
        ...updatedProducts[index],
        [name]: value,
      };
    }

    setFormData({ ...formData, products: updatedProducts });
  };

  const addProduct = () => {
    setFormData({ ...formData, products: [...formData.products, { product_name: "", sell_price: 0 }] });
  };

  const removeProduct = (index: number) => {
    const updatedProducts = formData.products.filter((_, i) => i !== index);
    setFormData({ ...formData, products: updatedProducts });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("https://pharmacy-api-roan.vercel.app/api/supplier/add-supplier-products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Gagal untuk menambahkan Supplier dan Produk");
      }

      setMessage("Berhasil menambahkan Supplier dan Produk");
      setShowModal(true);

      setFormData({
        supplier_name: "",
        phone_number: "",
        address: "",
        products: [{ product_name: "", sell_price: 0 }],
      });

      setTimeout(() => {
        setShowModal(false);
        navigate("/supplier");
      }, 3000);
    } catch (error: any) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
        <div>
          <Label htmlFor="supplier_name" value="Nama Supplier" />
          <TextInput id="supplier_name" name="supplier_name" type="text" required value={formData.supplier_name} onChange={handleChange} />
        </div>
        <div>
          <Label htmlFor="phone_number" value="Nomor Telepon" />
          <TextInput id="phone_number" name="phone_number" type="tel" placeholder="081122334455" required value={formData.phone_number} onChange={handleChange} />
        </div>
        <div>
          <Label htmlFor="address" value="Alamat" />
          <Textarea id="address" name="address" placeholder="Alamat" rows={4} required value={formData.address} onChange={handleChange} className="w-full" />
        </div>
        <div>
          <Label value="Produk" />
          {formData.products.map((product, index) => (
            <div key={index} className="flex flex-col gap-2 p-2 border rounded-lg shadow-sm">
              <Label>Produk {index + 1}</Label>
              <TextInput type="text" name="product_name" placeholder="Nama Produk" required value={product.product_name} onChange={(e) => handleProductChange(index, e)} />
              <TextInput
                type="text"
                name="sell_price"
                placeholder="Rp. 0"
                required
                value={product.sell_price ? `Rp. ${formatRupiah(product.sell_price)}` : ""}
                onChange={(e) => handleProductChange(index, e)}
              />
              {index > 0 && <Button color="red" onClick={() => removeProduct(index)}>Hapus</Button>}
            </div>
          ))}
          <Button type="button" onClick={addProduct} className="mt-4 w-full">+ Tambah Produk</Button>
        </div>
        <Button type="submit" className="w-full">Submit</Button>
        {message && <p className="text-center text-green-600">{message}</p>}
      </form>
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <Modal.Header>Success</Modal.Header>
        <Modal.Body>
          <p>Supplier dan produk berhasil ditambahkan! Mengarahkan...</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => navigate("/supplier")}>Pergi Sekarang</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default RegistrationForm;
