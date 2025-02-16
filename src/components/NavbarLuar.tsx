"use client";

import { Navbar } from "flowbite-react";
import Logo  from "../assets/LOGO2.jpeg"

export default function Component() {
  return (
    <Navbar fluid rounded className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
        <Navbar.Brand href="https://wpharmacy.netlify.app/">
        <img src={Logo}
            className="mr-3 h-10 sm:h-12" 
            alt="Flowbite React Logo" />
        {/* <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Welcome
        </span> */}
        </Navbar.Brand>
    </Navbar>
  
  );
}
