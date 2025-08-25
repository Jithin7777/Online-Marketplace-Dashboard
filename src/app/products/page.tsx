import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import PageBreadcrumb from "@/components/PageBreadcrumb";
import { ProductTable } from "@/components/ProductTable/index";
import SecondaryNav from "@/components/SecondaryNav";
import TrustedClients from "@/components/TrustedClients";
import React from "react";

const page = () => {
  return (
    <div>
      <Navbar />
      <SecondaryNav />
      <PageBreadcrumb/>
      <Hero />
      <ProductTable />
      <TrustedClients />
      <Footer />
    </div>
  );
};

export default page;
