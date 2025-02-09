import { useState } from "react";
import { Textarea, TextInput, Label, Button, Modal } from "flowbite-react";
import { useNavigate } from "react-router-dom";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    supplier_name: "",
    phone_number: "",
    address: "",
  });

  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/supplier/add-supplier", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to add supplier");
      }

      setMessage("Supplier successfully added!");
      setShowModal(true);

      // Reset form
      setFormData({ supplier_name: "", phone_number: "", address: "" });

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
          <Label htmlFor="phone_number" value="Phone Number" />
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

        {/* Submit Button */}
        <Button type="submit" className="w-full">Submit</Button>

        {/* Message Feedback */}
        {message && <p className="text-center text-green-600">{message}</p>}
      </form>

      {/* Success Modal */}
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <Modal.Header>Success</Modal.Header>
        <Modal.Body>
          <p>Supplier successfully added! Redirecting...</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => navigate("/supplier")}>Go Now</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default RegistrationForm;
