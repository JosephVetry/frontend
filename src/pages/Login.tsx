"use client";

import { Button, Card, Label, TextInput } from "flowbite-react";
import Navbar from "../components/NavbarLuar"
import Footer from "../components/Footer"


export default function Login() {
  return (
    <div>
      <Navbar/>
      <div className="flex justify-center items-center min-h-screen bg-gray-300">
        <Card className="max-w-sm w-full">
          <form className="flex flex-col gap-4 p-4">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email1" value="Your email" />
              </div>
              <TextInput id="email1" type="email" placeholder="example@gmail.com" required />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password1" value="Your password" />
              </div>
              <TextInput id="password1" type="password" placeholder="password" required />
            </div>
            <Button type="submit">Submit</Button>
          </form>
        </Card>
      </div>
      <Footer/>
    </div>

  );
}

