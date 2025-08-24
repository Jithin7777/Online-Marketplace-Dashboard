"use client";
import React, { useState, useEffect } from "react";
import { Product } from "../../types/product";
import { SidebarFilters } from "./SidebarFilters";
import { Table } from "./ProductList";
import { TablePagination } from "./TablePagination";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";

export const ProductTable: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [total, setTotal] = useState(0);

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [sortBy, setSortBy] = useState<"price" | "stock" | "createdAt">(
    "createdAt"
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const categories = ["Electronics", "Fashion", "Books"];
  const statuses = ["active", "out-of-stock"];
  const router = useRouter();

  // Debounce search
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      setPage(1);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
    setPage(1);
  };

  const toggleStatus = (status: string) =>
    setSelectedStatuses((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status]
    );

  const clearAll = () => {
    setSelectedCategories([]);
    setSelectedStatuses([]);
    setSearchQuery("");
    setPage(1);
  };

  const fetchProducts = async () => {
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: String(limit),
        sortBy,
        sortOrder,
      });
      if (selectedCategories.length)
        params.append("category", selectedCategories.join(","));
      if (selectedStatuses.length)
        params.append("status", selectedStatuses.join(","));
      if (debouncedSearch) params.append("search", debouncedSearch);

      const res = await fetch(`/api/products?${params.toString()}`);
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();
      setProducts(data.data);
      setTotal(data.total);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = () => {
    router.push("/products/add");
  };

  useEffect(() => {
    fetchProducts();
  }, [
    page,
    selectedCategories,
    selectedStatuses,
    debouncedSearch,
    sortBy,
    sortOrder,
  ]);

  const handleDeleteClick = (id: string) => {
    setDeleteId(id);
    setIsAlertOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!deleteId) return;

    if (!deleteId.startsWith("temp-")) {
      try {
        const res = await fetch(`/api/products/${deleteId}`, {
          method: "DELETE",
        });

        if (!res.ok) {
          const err = await res.json();
          toast.error(err.error || "Failed to delete product");
          return;
        }

        const data = await res.json();
        console.log("Deleted on server:", data);

        setProducts((prev) => prev.filter((p) => p.id !== deleteId));
        setTotal((prev) => prev - 1);

        toast.success("Product deleted successfully!");
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error(err.message);
          toast.error(err.message);
        } else {
          console.error(err);
          toast.error("Something went wrong");
        }
      }
    } else {
      setProducts((prev) => prev.filter((p) => p.id !== deleteId));
      setTotal((prev) => prev - 1);
      toast.success("Product deleted successfully!");
    }

    setDeleteId(null);
    setIsAlertOpen(false);
  };
  return (
    <div className="flex flex-col lg:flex-row gap-6 p-4">
      <SidebarFilters
        categories={categories}
        statuses={statuses}
        selectedCategories={selectedCategories}
        selectedStatuses={selectedStatuses}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        toggleCategory={toggleCategory}
        toggleStatus={toggleStatus}
        clearAll={clearAll}
      />

      <div className="flex-1 bg-white rounded-xl p-4 shadow-md">
        {/* Sorting */}
        <div className="flex items-center gap-3 mb-4 flex-wrap">
          <label className="text-gray-700 text-sm md:text-lg">Sort By:</label>
          <select
            value={sortBy}
            onChange={(e) =>
              setSortBy(e.target.value as "price" | "stock" | "createdAt")
            }
            className="border px-1 md:px-3 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="price">Price</option>
            <option value="stock">Stock</option>
            <option value="createdAt" className="">Created At</option>
          </select>

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
            className="border px-1 md:px-3 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
        {error && (
          <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">
            {error}
          </div>
        )}

        <Table
          products={products}
          loading={loading}
          limit={limit}
          sortBy={sortBy}
          sortOrder={sortOrder}
          handleSort={() => {}}
          onAdd={handleAddProduct}
          onDelete={handleDeleteClick}
        />

        <TablePagination
          page={page}
          total={total}
          limit={limit}
          setPage={setPage}
        />
      </div>

      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Delete</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this product? This action cannot
              be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex justify-end gap-2 mt-4">
            <AlertDialogCancel onClick={() => setIsAlertOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
            >
              Delete
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>

      <Toaster position="top-center" />
    </div>
  );
};
