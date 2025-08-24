"use client";
import React, { useState } from "react";
import { Menu, X } from "lucide-react";

const SecondaryNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-[#304EA1] text-white">
      <div className="container mx-auto flex justify-between items-center py-2 px-6 text-sm">
        <nav className="hidden md:flex space-x-6">
          <a href="#" className="hover:underline font-open-sans">
            Products
          </a>
          <a href="#" className="hover:underline font-open-sans">
            Suppliers
          </a>
          <a href="#" className="hover:underline font-open-sans">
            Services
          </a>
          <a href="#" className="hover:underline font-open-sans">
            Service Providers
          </a>
          <a href="#" className="hover:underline font-open-sans">
            RFQ Marketplace
          </a>
        </nav>

        <button
          className="md:hidden ml-auto"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div
        className={`md:hidden bg-[#304EA1] overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? "max-h-96 opacity-100 py-4" : "max-h-0 opacity-0 py-0"
        }`}
      >
        <div className="px-6 space-y-3">
          <a href="#" className="block hover:underline font-open-sans">
            Products
          </a>
          <a href="#" className="block hover:underline font-open-sans">
            Suppliers
          </a>
          <a href="#" className="block hover:underline font-open-sans">
            Services
          </a>
          <a href="#" className="block hover:underline font-open-sans">
            Service Providers
          </a>
          <a href="#" className="block hover:underline font-open-sans">
            RFQ Marketplace
          </a>
        </div>
      </div>
    </div>
  );
};

export default SecondaryNav;
