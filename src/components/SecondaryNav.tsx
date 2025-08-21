// components/SecondaryNav.tsx
import React from "react";

const SecondaryNav = () => {
  return (
    <div className="bg-[#304EA1] text-white">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center py-2  px-6 text-sm   ">
        <nav className="flex space-x-6 ">
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

        {/* Breadcrumb */}
        {/* <div className="mt-2 md:mt-0">
          Home / Product
        </div> */}
      </div>
    </div>
  );
};

export default SecondaryNav;
