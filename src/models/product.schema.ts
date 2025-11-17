import { Schema, model, Document } from "mongoose";

export interface ProductDocument extends Document {
  name: string;
  description: string;
}

const productSchema = new Schema<ProductDocument>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

export const ProductModel = model<ProductDocument>("Product", productSchema);
