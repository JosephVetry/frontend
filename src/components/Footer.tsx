
"use client";

import { Footer } from "flowbite-react";

export default function Component() {
  return (
    <Footer container className="bg-gray-200 py-4">
        <div className="w-full flex justify-center items-center">
            <Footer.Copyright 
            by="Copyright by Jonathan" 
            year={2025} 
            className="text-black text-center"
            />
        </div>
    </Footer>
  );
}
