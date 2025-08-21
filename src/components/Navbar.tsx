// components/Navbar.tsx
import { Search } from "lucide-react";
import React from "react";

const SearchBar = ({ className }: { className?: string }) => (
  <div className={`relative w-full max-w-md ${className}`}>
    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
    <input
      type="text"
      placeholder="Search for products"
      className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
    />
  </div>
);

const Navbar = () => {
  return (
    <header className="bg-white shadow-md px-4 md:px-16">
      <div className="container mx-auto grid grid-cols-2 md:grid-cols-3 items-center py-3">
        <div className="flex items-center space-x-2">
          <img
            src="/images/logo.png"
            alt="Logo"
            className="h-6 md:h-8 w-auto"
          />
        </div>

        <div className="hidden md:flex justify-center">
          <SearchBar />
        </div>

        <div className="flex justify-end space-x-2">
          <button className="bg-[#304EA1] text-white px-4 py-2 font-poppins rounded-full hover:bg-blue-700">
            Register
          </button>
          <button className="border border-blue-600 text-blue-600 font-poppins px-4 py-2 rounded-full hover:bg-blue-50">
            Login
          </button>
        </div>
      </div>

      <div className="md:hidden px-4 pb-3">
        <SearchBar />
      </div>
    </header>
  );
};

export default Navbar;
