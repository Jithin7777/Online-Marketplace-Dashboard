import React from "react";
import Image from "next/image"; 

const Hero = () => {
  return (
    <section className="md:px-10 mt-5 md:mt-10">
      <div className="container bg-black mx-auto flex flex-col md:flex-row items-center md:rounded-2xl overflow-hidden">
        <div className="w-full md:w-2/3 text-center md:text-left bg-black text-white p-5 md:p-8 lg:p-12 order-2 md:order-1">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-3xl font-open-sans mb-4 md:mb-6">
            Durable Construction: The 3M 6200 half face respirator, ensuring a
            durable and long-lasting product.
          </h1>
          <button className="bg-[#304EA1] font-open-sans text-white px-6 py-3 md:py-2 rounded-full hover:bg-blue-700 text-sm md:text-base">
            Buy Now
          </button>
        </div>

        <div className="w-full md:w-1/2 mt-0 md:mt-0 flex justify-center md:order-2">
          <Image
            src="/images/hero-image.png"
            alt="Respirator"
            width={600} 
            height={400} 
            className="w-full sm:w-2/3 md:w-full md:max-w-none rounded-md"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
