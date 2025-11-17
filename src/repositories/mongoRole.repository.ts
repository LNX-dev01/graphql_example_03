import { RoleModel } from "../models/role.schema";

import { RoleResponseInterface } from "../interfaces/interfaceRole";

export class MongoRoleRepository {
  async findAll(): Promise<RoleResponseInterface[]> {
    const docs = await RoleModel.find().lean();
    return docs.map(this.toDomainPlain);
  }
  async save(role: any): Promise<RoleResponseInterface> {
    const created = new RoleModel(this.toPersistence(role));
    const saved = await created.save();
    return this.toDomainPlain(saved);
  }
  async update(role: any): Promise<RoleResponseInterface> {
    const updated = await RoleModel.findOneAndUpdate(
      { _id: role.roleId },
      this.toPersistence(role),
      { new: true }
    );
    if (!updated) throw new Error("Role not found for update");
    return this.toDomainPlain(updated);
  }
 async deleteRole(id: any): Promise<boolean> {
    try {
      const deleted = await RoleModel.findByIdAndDelete(id);
      return !!deleted;
    } catch {
      return false;
    }
  }
  private toPersistence(role: any) {
    return {
      roleType: role.roleType,
      shiftType: role.shiftType,
    };
  }

  private toDomainPlain(doc: any): RoleResponseInterface {
    return {
      roleId: doc._id.toString(),
      roleType: doc.roleType ?? "",
      shiftType: doc.shiftType ?? "",
    };
  }
}
export const RoleRepository = new MongoRoleRepository();
