import { Schema, model, Document } from "mongoose";

export interface RoleDocument extends Document {
  roleType: string;
  shiftType: string;
}

const roleSchema = new Schema<RoleDocument>(
  {
    roleType: { type: String, required: true },
    shiftType: { type: String, required: true },
  },
  { timestamps: true }
);

export const RoleModel = model<RoleDocument>("Role", roleSchema);
