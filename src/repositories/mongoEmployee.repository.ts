import {EmployeeModel } from "../models/employee.schema";
import { EmployeeResponse_As_Entity, EmployeeResponse_C_I } from "../interfaces/interfaceEmployee";
import { log } from "console";

export class MongoEmployeeRepository {
  async findAll(): Promise<EmployeeResponse_C_I[]> {
    const docs = await EmployeeModel.find({ roleId: { $exists: true } })
      .populate({
        path: "roleId",
        select: "roleType shiftType",
      })
      .lean();
    return docs.map((doc) => this.toEmployeeResponseComplete(doc));
    log(docs);
  }
  async save(employee: any): Promise<EmployeeResponse_As_Entity> {
    const created = new EmployeeModel(this.toPersistence(employee));
    const saved = await created.save();
    return this.toDomainPlain(saved);
  }
  async update(employee: any): Promise<EmployeeResponse_As_Entity | null> {
    const updated = await EmployeeModel.findOneAndUpdate(
      { _id: employee.employeeId }, 
      this.toPersistence(employee),
      { new: true }
    );
    if (!updated) throw new Error("Employee not found for update");
    return this.toDomainPlain(updated);
  }
  async deleteEmployee(id: any): Promise<boolean> {
    try {
      const deleted = await EmployeeModel.findByIdAndDelete(id);
      return !!deleted;
    } catch {
      return false;
    }
  }
  private toPersistence(employee: any) {
    return {
      name: employee.name,
      email: employee.email,
      roleId: employee.roleId,
    };
  }

  private toDomainPlain(doc: any): EmployeeResponse_As_Entity {
    return {
      employeeId: doc._id.toString(),
      name: doc.name,
      email: doc.email,
      roleId: doc.roleId,
    };
  }

  private toEmployeeResponseComplete(doc: any): EmployeeResponse_C_I {
    return {
      employeeId: doc._id.toString(),
      name: doc.name,
      email: doc.email,
      role: {
        roleId: doc.roleId?._id ?? "",
        roleType: doc.roleId?.roleType ?? "",
        shiftType: doc.roleId?.shiftType ?? "",
      },
    };
  }
}

export const EmployeeRepository = new MongoEmployeeRepository();
