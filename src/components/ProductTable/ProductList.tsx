"use client";
import React from "react";
import { Product } from "../../types/product";
import {
  Table as ShadTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash } from "lucide-react";

interface TableProps {
  products: Product[];
  loading: boolean;
  limit: number;
  sortBy: "price" | "stock" | "createdAt";
  sortOrder: "asc" | "desc";
  handleSort: (column: "price" | "stock" | "createdAt") => void;
  onAdd: () => void; // callback to handle add product
  onDelete: (id: string) => void;
}

export const Table: React.FC<TableProps> = ({
  products,
  loading,
  limit,
  sortBy,
  handleSort,
  onAdd,
  onDelete,
}) => {
  const getStatusIndicator = (status: string) => {
    const colors: Record<string, string> = {
      active: "bg-green-500",
      "out-of-stock": "bg-red-500",
    };
    return colors[status] || "bg-gray-400";
  };

  return (
    <div className="overflow-x-auto font-open-sans">
      <div className="flex justify-end mb-3">
        <button
          onClick={onAdd}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          + Add Product
        </button>
      </div>

      <ShadTable>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead
              className="cursor-pointer"
              onClick={() => handleSort("price")}
            >
              Price {sortBy === "price"}
            </TableHead>
            <TableHead
              className="cursor-pointer"
              onClick={() => handleSort("stock")}
            >
              Stock {sortBy === "stock"}
            </TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Vendor</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {loading ? (
            Array.from({ length: limit }).map((_, idx) => (
              <TableRow key={idx}>
                {Array.from({ length: 7 }).map(
                  (
                    __,
                    i // 7 instead of 6
                  ) => (
                    <TableCell
                      key={i}
                      className="animate-pulse bg-gray-200 h-4"
                    >
                      &nbsp;
                    </TableCell>
                  )
                )}
              </TableRow>
            ))
          ) : products.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center text-gray-500">
                {" "}
                No products found.
              </TableCell>
            </TableRow>
          ) : (
            products.map((p) => (
              <TableRow
                key={p.id}
                className="hover:bg-gray-50 transition-all duration-200"
              >
                <TableCell>{p.name}</TableCell>
                <TableCell>${p.price}</TableCell>
                <TableCell>{p.stock}</TableCell>
                <TableCell>{p.category}</TableCell>
                <TableCell>
                  <span
                    className={`inline-block w-3 h-3 rounded-full mr-2 ${getStatusIndicator(
                      p.status
                    )}`}
                  ></span>
                  {p.status}
                </TableCell>
                <TableCell>{p.vendor}</TableCell>
                <TableCell>
                  <button
                    onClick={() => onDelete(p.id)} // Make sure you pass onDelete prop
                    className="bg-red-500 text-white px-1 py-1 rounded hover:bg-red-600 transition"
                  >
                    <Trash className="h-5 w-5" />
                  </button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </ShadTable>
    </div>
  );
};
