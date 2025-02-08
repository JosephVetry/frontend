
"use client";

import { Navbar } from "flowbite-react";

export default function Component() {
  return (
    <Navbar fluid rounded className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
        <Navbar.Brand href="https://google.com">
        <img src="https://logos-world.net/wp-content/uploads/2023/07/Las-Vegas-Logo.png" 
            className="mr-3 h-6 sm:h-9" 
            alt="Flowbite React Logo" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Welcome
        </span>
        </Navbar.Brand>
    </Navbar>
  
  );
}
