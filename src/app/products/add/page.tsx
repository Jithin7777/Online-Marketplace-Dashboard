"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema, ProductFormData } from "@/types/product";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Product } from "@/types/product";
import toast from "react-hot-toast";

export default function AddProductPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
  });
  const router = useRouter();

  const onSubmit = async (data: ProductFormData) => {
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to add product");

      const savedProduct = await res.json();

      const storedProducts = localStorage.getItem("products");
      const productsArray: Product[] = storedProducts
        ? JSON.parse(storedProducts)
        : [];
      localStorage.setItem(
        "products",
        JSON.stringify([savedProduct, ...productsArray])
      );

      toast.success("Product added successfully!");

      router.push("/products");
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err.message);
        toast.error(err.message);
      } else {
        console.error(err);
        toast.error("Failed to add product");
      }
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 max-w-3xl mx-auto p-8 bg-white rounded-2xl shadow-lg mt-10"
    >
      <div className="flex flex-col">
        <label className="mb-2 text-gray-700 font-medium">Product Name</label>
        <input
          {...register("name")}
          placeholder="Enter product name"
          className="w-full border border-gray-300 px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition"
        />
        {errors.name && (
          <p className="text-red-500 mt-1 text-sm">{errors.name.message}</p>
        )}
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label className="mb-2 text-gray-700 font-medium">Price ($)</label>
          <input
            type="number"
            {...register("price", { valueAsNumber: true })}
            placeholder="Enter price"
            className="w-full border border-gray-300 px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition"
          />
          {errors.price && (
            <p className="text-red-500 mt-1 text-sm">{errors.price.message}</p>
          )}
        </div>

        <div className="flex flex-col">
          <label className="mb-2 text-gray-700 font-medium">Stock</label>
          <input
            type="number"
            {...register("stock", { valueAsNumber: true })}
            placeholder="Enter stock quantity"
            className="w-full border border-gray-300 px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition"
          />
          {errors.stock && (
            <p className="text-red-500 mt-1 text-sm">{errors.stock.message}</p>
          )}
        </div>
      </div>

      <div className="flex flex-col">
        <label className="mb-2 text-gray-700 font-medium">Category</label>
        <input
          {...register("category")}
          placeholder="Enter category"
          className="w-full border border-gray-300 px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition"
        />
        {errors.category && (
          <p className="text-red-500 mt-1 text-sm">{errors.category.message}</p>
        )}
      </div>

      <div className="flex flex-col">
        <label className="mb-2 text-gray-700 font-medium">Vendor</label>
        <input
          {...register("vendor")}
          placeholder="Enter vendor name"
          className="w-full border border-gray-300 px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition"
        />
        {errors.vendor && (
          <p className="text-red-500 mt-1 text-sm">{errors.vendor.message}</p>
        )}
      </div>

      <div className="flex flex-col">
        <label className="mb-2 text-gray-700 font-medium">Status</label>
        <select
          {...register("status")}
          className="w-full border border-gray-300 px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition"
        >
          <option value="">Select status</option>
          <option value="active">Active</option>
          <option value="out-of-stock">Out of Stock</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className=" bg-red-500 text-white font-medium px-6 py-3 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 transition"
      >
        {isSubmitting ? "Adding..." : "Add Product"}
      </button>
    </form>
  );
}
