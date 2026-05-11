export interface Product {
    _id: string;
    name: string;
    description: string;
    image: string;
    price: number;
    season: string;
    fabricType: "Stitched" | "Unstitched";
     category: {
    _id: string;
    name: string;
    image: string;
  };
    color: string;
    size: string;
    stock: number;
    createdAt: string;
    updatedAt: string;
}

export interface CreateProductPayload {
    name: string;
    description: string;
    image: string;
    price: number;
    season: string;
    fabricType: "Stitched" | "Unstitched";
    category: string;
    color: string;
    size: string;
    stock: number;
}

export interface CreateProductFormData {
  name: string;
  description: string;
  image: File;
  price: number;
  season: string;
  fabricType: "Stitched" | "Unstitched";
  category: string;
  color: string;
  size: string;
  stock: number;
}