import { useState } from "react";
import { Textarea, TextInput, Label, Button, Modal } from "flowbite-react";
import { useNavigate } from "react-router-dom";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    supplier_name: "",
    phone_number: "",
    address: "",
    products: [{ product_name: "", sell_price: "" }], // Default empty product entry
  });

  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  // Handle input change for supplier details
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle input change for product list
  const handleProductChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedProducts = [...formData.products];
    updatedProducts[index] = { ...updatedProducts[index], [name]: value };
    setFormData({ ...formData, products: updatedProducts });
  };

  // Add new product field
  const addProduct = () => {
    setFormData({ ...formData, products: [...formData.products, { product_name: "", sell_price: "" }] });
  };

  // Remove a product field
  const removeProduct = (index: number) => {
    const updatedProducts = formData.products.filter((_, i) => i !== index);
    setFormData({ ...formData, products: updatedProducts });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("https://pharmacy-api-roan.vercel.app/api/supplier/add-supplier-products", { 
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      

      if (!response.ok) {
        throw new Error("Failed to add supplier and products");
      }

      setMessage("Supplier and products successfully added!");
      setShowModal(true);

      // Reset form
      setFormData({
        supplier_name: "",
        phone_number: "",
        address: "",
        products: [{ product_name: "", sell_price: "" }],
      });

      // Redirect to /supplier after 3 seconds
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
        {/* Supplier Name */}
        <div>
          <Label htmlFor="supplier_name" value="Nama Supplier" />
          <TextInput
            id="supplier_name"
            name="supplier_name"
            type="text"
            required
            value={formData.supplier_name}
            onChange={handleChange}
          />
        </div>

        {/* Phone Number */}
        <div>
          <Label htmlFor="phone_number" value="Nomor Telepon" />
          <TextInput
            id="phone_number"
            name="phone_number"
            type="tel"
            placeholder="081122334455"
            required
            value={formData.phone_number}
            onChange={handleChange}
          />
        </div>

        {/* Address */}
        <div>
          <Label htmlFor="address" value="Alamat" />
          <Textarea
            id="address"
            name="address"
            placeholder="Alamat"
            rows={4}
            required
            value={formData.address}
            onChange={handleChange}
            className="w-full"
          />
        </div>

        {/* Product List */}
        <div>
          <Label value="Produk" />
        {formData.products.map((product, index) => (
  <div key={index} className="flex flex-col gap-2 p-2 border rounded-lg shadow-sm">
    <Label>Produk {index + 1}</Label>
    <TextInput
      type="text"
      name="product_name"
      placeholder="Nama Produk"
      required
      value={product.product_name}
      onChange={(e) => handleProductChange(index, e)}
    />
    <TextInput
      type="number"
      name="sell_price"
      placeholder="Harga"
      required
      value={product.sell_price}
      onChange={(e) => handleProductChange(index, e)}
    />
    {index > 0 && (
      <Button color="red" onClick={() => removeProduct(index)}>Remove</Button>
    )}
  </div>
))}
<Button type="button" onClick={addProduct} className="mt-4 w-full">+ Tambah Produk</Button>

      
        </div>

        {/* Submit Button */}
        <Button type="submit" className="w-full">Submit</Button>

        {/* Message Feedback */}
        {message && <p className="text-center text-green-600">{message}</p>}
      </form>

      {/* Success Modal */}
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <Modal.Header>Success</Modal.Header>
        <Modal.Body>
          <p>Supplier and products successfully added! Redirecting...</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => navigate("/supplier")}>Go Now</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default RegistrationForm;
