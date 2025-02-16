"use client";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios
import { Card, Label, TextInput, Button, Alert } from "flowbite-react";
import Navbar from "../components/NavbarLuar";
import Footer from "../components/Footer";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Store login errors
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn) {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
  
    try {
      const response: any = await axios.post("https://pharmacy-api-roan.vercel.app/api/users/login", {
        username, // ✅ Use the state variable
        password,
      });
  
      const { token, role, username: loggedInUsername } = response.data; // ✅ Rename destructured username
  
      // ✅ Store all required values in localStorage
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("user", loggedInUsername); // ✅ Store correctly
  
      // Redirect user after successful login
      navigate("/dashboard", { replace: true });
  
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed"); // Handle errors
    }
  };
  

  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center min-h-screen bg-gray-300">
        <Card className="max-w-sm w-full">
          <form className="flex flex-col gap-4 p-4" onSubmit={handleSubmit}>
            {error && <Alert color="failure">{error}</Alert>} {/* Show error */}

            <div>
              <div className="mb-2 block">
                <Label htmlFor="username" value="Username" />
              </div>
              <TextInput
                id="username"
                type="text"
                placeholder="Enter your username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password" value="Your password" />
              </div>
              <TextInput
                id="password"
                type="password"
                placeholder="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button type="submit" disabled={!username || !password}>
              Login
            </Button>
          </form>
        </Card>
      </div>
      <Footer />
    </div>
  );
}
