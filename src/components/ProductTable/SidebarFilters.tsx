"use client";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Search } from "lucide-react";

interface SidebarFiltersProps {
  categories: string[];
  statuses: string[];
  selectedCategories: string[];
  selectedStatuses: string[];
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  toggleCategory: (category: string) => void;
  toggleStatus: (status: string) => void;
  clearAll: () => void;
}

export const SidebarFilters: React.FC<SidebarFiltersProps> = ({
  categories,
  statuses,
  selectedCategories,
  selectedStatuses,
  searchQuery,
  setSearchQuery,
  toggleCategory,
  toggleStatus,
  clearAll,
}) => (
  <div className="w-full lg:w-64 flex-shrink-0 border rounded-xl p-6 space-y-6 shadow-md bg-white">
   <div className="relative w-full mb-2">  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
    <Search className="w-5 h-5" />
  </span>

  <input
    type="text"
    placeholder="Search by name or vendor"
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    className="w-full border pl-10 pr-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
  />
</div>

    <div className="flex justify-between items-center mt-5">
      <h3 className="text-lg font-semibold font-open-sans">Filters</h3>

      <button
        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition"
        onClick={clearAll}
      >
        Clear All
      </button>
    </div>

    <Accordion type="multiple" className="w-full">
      <AccordionItem value="categories">
        <AccordionTrigger className="text-[#304EA1] font-open-sans font-semibold">
          Categories
        </AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-wrap lg:flex-col gap-2">
            {categories.map((cat) => (
              <label
                key={cat}
                className="flex items-center space-x-2 cursor-pointer hover:text-blue-600"
              >
                <input
                  type="checkbox"
                  className="form-checkbox text-blue-500"
                  checked={selectedCategories.includes(cat)}
                  onChange={() => toggleCategory(cat)}
                />
                <span className="font-open-sans text-[#304EA1]">{cat}</span>
              </label>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="status">
        <AccordionTrigger className="text-[#304EA1] font-open-sans font-semibold">
          Status
        </AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-wrap lg:flex-col gap-2">
            {statuses.map((stat) => (
              <label
                key={stat}
                className="flex items-center space-x-2 cursor-pointer hover:text-blue-600"
              >
                <input
                  type="checkbox"
                  className="form-checkbox text-blue-500"
                  checked={selectedStatuses.includes(stat)}
                  onChange={() => toggleStatus(stat)}
                />
                <span className="font-open-sans text-[#304EA1]">{stat}</span>
              </label>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  </div>
);
