import { useState } from "react";
import { Textarea, TextInput, Label, Button } from "flowbite-react";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    phone: "",
    company: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
      <div className="gap-4">
        <div>
          <Label htmlFor="Nama Supplier" value="Nama Supplier" />
          <TextInput id="namaSupplier" name="namaSupplier" type="text" required onChange={handleChange} />
        </div>
      </div>

      {/* Phone & Company */}
      <div className="gap-4">
        <div>
          <Label htmlFor="phone" value="Phone Number" />
          <TextInput id="phone" name="phone" type="tel"  placeholder="081122334455" required onChange={handleChange} />
        </div>
      </div>

      <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        Alamat
      </label>
      <Textarea
        id="alamat"
        placeholder="Alamat"
        rows={4}
        className="w-full"
      />

      {/* Submit Button */}
      <Button type="submit" className="w-full">Submit</Button>
    </form>
  );
};

export default RegistrationForm;
