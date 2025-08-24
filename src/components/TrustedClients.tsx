"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const clients = [
  { src: "/images/3m.png", alt: "3M" },
  { src: "/images/amentum.jpg", alt: "Amentum" },
  { src: "/images/daikin.jpg", alt: "Daikin" },
  { src: "/images/ge.png", alt: "GE" },
  { src: "/images/airwheel.jpg", alt: "Airwheel" },
];

export default function TrustedClients() {
  const [startIndex, setStartIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(4);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsToShow(2);
      } else if (window.innerWidth < 768) {
        setItemsToShow(3);
      } else {
        setItemsToShow(5);
      }
      
      setStartIndex(0);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handlePrev = () => {
    setStartIndex((prev) =>
      prev === 0 ? clients.length - itemsToShow : prev - 1
    );
  };

  const handleNext = () => {
    setStartIndex((prev) =>
      prev + itemsToShow >= clients.length ? 0 : prev + 1
    );
  };

  const handleTouchStart = (e:any) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e:any) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      handleNext();
    } else if (touchEnd - touchStart > 50) {
      handlePrev();
    }
  };

  const getVisibleClients = useCallback(() => {
    let visibleClients = [];
    
    if (startIndex + itemsToShow <= clients.length) {
      visibleClients = clients.slice(startIndex, startIndex + itemsToShow);
    } else {
      const itemsFromStart = clients.slice(startIndex);
      const itemsFromBeginning = clients.slice(0, itemsToShow - itemsFromStart.length);
      visibleClients = [...itemsFromStart, ...itemsFromBeginning];
    }
    
    return visibleClients;
  }, [startIndex, itemsToShow]);

  return (
    <section className="w-full bg-gray-50 py-8 md:py-10">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-lg md:text-xl lg:text-2xl font-poppins mb-6">
          Trusted by leading Clients
        </h2>

        <div className="flex items-center justify-center pt-8 pb-10 gap-2 md:gap-1">
          <button
            onClick={handlePrev}
            className="p-1 md:p-2 rounded-full bg-white shadow hover:bg-gray-100 hidden sm:block"
            aria-label="Previous clients"
          >
            <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
          </button>

          <div 
            className="flex gap-3  md:gap-6 overflow-hidden w-full justify-center"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {getVisibleClients().map((client, idx) => (
              <div
                key={`${client.alt}-${idx}`}
                className="flex-shrink-0  w-[45%] xs:w-[30%] sm:w-[22%] md:w-32 h-16 md:h-30 flex items-center justify-center bg-white rounded-md shadow-sm p-2 "
              >
                <div className="relative w-full h-full ">
                  <Image
                    src={client.src}
                    alt={client.alt}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={handleNext}
            className="p-1 md:p-2 rounded-full bg-white shadow hover:bg-gray-100 hidden sm:block"
            aria-label="Next clients"
          >
            <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
          </button>
        </div>

        <div className="flex justify-center mt-4 sm:hidden">
          {Array.from({ length: Math.ceil(clients.length / itemsToShow) }).map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full mx-1 ${
                Math.floor(startIndex / itemsToShow) === index 
                  ? 'bg-blue-500' 
                  : 'bg-gray-300'
              }`}
              onClick={() => setStartIndex(index * itemsToShow)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}