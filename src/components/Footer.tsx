"use client";
import React from "react";
import { Mail, Phone, MapPin } from "lucide-react"; 
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube, FaLinkedin } from "react-icons/fa"; 

export default function Footer() {
  return (
    <footer className="bg-[#2E3047] text-gray-300 font-open-sans ">
     
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
       
        <div className="space-y-6 pr-6 md:border-r md:border-white">
          <div>
            <h3 className="font-semibold text-white mb-3">Get to Know Us</h3>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
              <li className="flex items-center hover:text-red-500 cursor-pointer">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                About Us
              </li>
              <li className="flex items-center hover:text-red-500 cursor-pointer">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                Process
              </li>
              <li className="flex items-center hover:text-red-500 cursor-pointer">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                Contact Us
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-3">Useful Links</h3>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
              <li className="flex items-center hover:text-red-500 cursor-pointer">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                FAQ
              </li>
              <li className="flex items-center hover:text-red-500 cursor-pointer">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                Terms & Conditions
              </li>
              <li className="flex items-center hover:text-red-500 cursor-pointer">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                Privacy Policy
              </li>
              <li className="flex items-center hover:text-red-500 cursor-pointer">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                News & Blogs
              </li>
              <li className="flex items-center hover:text-red-500 cursor-pointer">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                Help Center
              </li>
            </ul>
          </div>
        </div>


        <div className="flex flex-col items-center text-center">
          <h2 className="text-xl font-bold text-white">iProcure</h2>
          <p className="text-sm mt-3">
            An innovative tech platform by Big Trader Technology
            <br />
            simplifying B2B procurement in Qatar.
          </p>
          <div className="flex gap-4 mt-4 text-lg">
            <FaLinkedin className="hover:text-red-500 cursor-pointer" />
            <FaInstagram className="hover:text-red-500 cursor-pointer" />
            <FaFacebook className="hover:text-red-500 cursor-pointer" />
            <FaTwitter className="hover:text-red-500 cursor-pointer" />
            <FaYoutube className="hover:text-red-500 cursor-pointer" />
          </div>
        </div>

      
        <div className="pl-6 md:border-l md:border-white space-y-6">
          <h3 className="font-semibold text-white">Contact Information</h3>
          <ul className="space-y-4 text-sm">
            <li className="flex items-start gap-2">
              <MapPin size={16} className="mt-1 text-red-500" />
              <div>
                <span className="block font-semibold text-white">Get in Touch With Us</span>
                iProcure.ai, Doha, Qatar
              </div>
            </li>
            <li className="flex items-start gap-2">
              <Mail size={16} className="mt-1 text-red-500" />
              <div>
                <span className="block font-semibold text-white">Email Address</span>
                info@iprocure.ai
              </div>
            </li>
            <li className="flex items-start gap-2">
              <Phone size={16} className="mt-1 text-red-500" />
              <div>
                <span className="block font-semibold text-white">Phone Number</span>
                +974 7799 9600
              </div>
            </li>
          </ul>
        </div>
      </div>

  
      <div className="text-center py-4 text-sm border-t border-gray-600 ">
        Copyright © 2025{" "}
        <span className="text-red-500 font-semibold">iProcure.ai</span>. All Rights Reserved
      </div>
    </footer>
  );
}
