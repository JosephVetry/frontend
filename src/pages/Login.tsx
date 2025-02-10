"use client";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Label, TextInput, Button } from "flowbite-react";
import Navbar from "../components/NavbarLuar";
import Footer from "../components/Footer";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // 🔹 Proteksi agar user yang sudah login tidak bisa kembali ke halaman login
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn) {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 🔹 Simpan status login di localStorage
    localStorage.setItem("isLoggedIn", "true");

    // 🔹 Redirect ke dashboard tanpa bisa kembali
    navigate("/dashboard", { replace: true });
  };

  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center min-h-screen bg-gray-300">
        <Card className="max-w-sm w-full">
          <form className="flex flex-col gap-4 p-4" onSubmit={handleSubmit}>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email1" value="Your email" />
              </div>
              <TextInput
                id="email1"
                type="email"
                placeholder="example@gmail.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password1" value="Your password" />
              </div>
              <TextInput
                id="password1"
                type="password"
                placeholder="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button type="submit" disabled={!email || !password}>
              Submit
            </Button>
          </form>
        </Card>
      </div>
      <Footer />
    </div>
  );
}
