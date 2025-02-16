"use client";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Navbar, Button } from "flowbite-react";
import Logo  from "../assets/LOGO2.jpeg"

export default function NavbarComponent() {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    // Get username from localStorage
    const storedUsername = localStorage.getItem("user");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear(); // Clear all data

    // Prevent going back after logout
    window.history.pushState(null, "", "/");

    // Redirect to home and reload page
    navigate("/", { replace: true });
    window.location.reload();
  };

  return (
    <Navbar fluid rounded className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
      <Navbar.Brand>
        <img 
          src={Logo}
          className="mr-3 h-10 sm:h-12" 
          alt="Pharmacy Logo" 
        />
        {/* <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Pharmacy
        </span> */}
      </Navbar.Brand>
      <div className="flex items-center md:order-2 gap-4">
        {username && (
          <span className="text-gray-700 font-medium">Hi , {username}</span> // ✅ Display username
        )}
        <Button onClick={handleLogout}>Keluar</Button>
        <Navbar.Toggle />
      </div>
    </Navbar>
  );
}
