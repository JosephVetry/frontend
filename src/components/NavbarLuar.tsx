
"use client";

import { Navbar } from "flowbite-react";

export default function Component() {
  return (
    <Navbar fluid rounded className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
        <Navbar.Brand>
        <img src="https://png.pngtree.com/png-vector/20220623/ourmid/pngtree-opened-capsule-icon-logo-cartoon-png-image_5319391.png" 
            className="mr-3 h-6 sm:h-9" 
            alt="Flowbite React Logo" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Welcome
        </span>
        </Navbar.Brand>
    </Navbar>
  
  );
}
