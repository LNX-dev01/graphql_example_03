import { Schema, model, Document } from "mongoose";

export interface SaleDocument extends Document {
  employeeId: Schema.Types.ObjectId;
  productId: Schema.Types.ObjectId[];
}

const saleSchema = new Schema<SaleDocument>(
  {
    employeeId: { type: Schema.Types.ObjectId, ref: "Employee", required: true },
    productId: [{ type: Schema.Types.ObjectId, ref: "Product", required: true }],
  },
  { timestamps: true }
);

export const SaleModel = model<SaleDocument>("Sale", saleSchema);
