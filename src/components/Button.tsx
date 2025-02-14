"use client";

import { Link } from "react-router-dom";
import { Button } from "flowbite-react";

const AddSupplierButton = () => {
  return (
    <div className="mb-5 flex flex-wrap gap-2">
      <Link to="/addsupplier">
        <Button> Tambah Supplier</Button>
      </Link>
    </div>
  );
};

export default AddSupplierButton;

