import { Schema, model, Document } from "mongoose";

export interface EmployeeDocument extends Document {
  name: string;
  email: string;
  roleId: Schema.Types.ObjectId;
}

const employeeSchema = new Schema<EmployeeDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    roleId: { type: Schema.Types.ObjectId, ref: "Role", required: true },
  },
  { timestamps: true }
);

export const EmployeeModel = model<EmployeeDocument>("Employee", employeeSchema);