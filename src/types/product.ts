
import {z} from "zod";
export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
  status: 'active' | 'out-of-stock';
  vendor: string;
  description?: string; 
  createdAt: string;
  images?: string[];     
}

export const productSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  price: z.number().positive("Price must be greater than 0"),
  stock: z.number().nonnegative("Stock cannot be negative"),
  category: z.string().min(1, "Category is required"),
  vendor: z.string().min(1, "Vendor is required"),
  status: z.enum(["active", "out-of-stock"]),
});

export type ProductFormData = z.infer<typeof productSchema>;