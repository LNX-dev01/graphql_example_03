import { SaleModel } from "../models/sale.schema";
import { SaleResponse_C_I, SaleResponse_As_Entity } from "../interfaces/interfaceSale";
import { log } from "console";

export class MongoSaleRepository {
  async findAll(): Promise<SaleResponse_C_I[]> {
    const docs = await SaleModel.find({ employeeId: { $exists: true }, productId: { $exists: true } })
      .populate({ path: "employeeId", select: "name email" })
      .populate({ path: "productId", select: "name description" })
      .sort({ date: -1 })
      .lean();
    return docs.map((doc) => this.toSaleResponseComplete(doc));
  }
  async save(sale: any): Promise<SaleResponse_As_Entity> {
    const created = new SaleModel(this.toPersistence(sale));
    const saved = await created.save();
    log("XD:", saved);
    return this.toDomainPlain(saved);
  }

  async update(sale: any): Promise<SaleResponse_As_Entity> {
    const updated = await SaleModel.findOneAndUpdate({ _id: sale.saleId }, this.toPersistence(sale), { new: true });
    if (!updated) throw new Error("Sale not found for update");
    return this.toDomainPlain(updated);
  }
  private toPersistence(sale: any) {
    return {
      employeeId: sale.employeeId,
      productId: sale.productId,
    };
  }
  async deleteSale(id: any): Promise<boolean> {
    try {
      const deleted = await SaleModel.findByIdAndDelete(id);
      return !!deleted;
    } catch {
      return false;
    }
  }
  private toDomainPlain(doc: any): SaleResponse_As_Entity {
    return {
      saleId: doc._id.toString(),
      employeeId: doc.employeeId,
      productId: doc.productId,
    };
  }
  private toSaleResponseComplete(doc: any): SaleResponse_C_I {
    return {
      saleId: doc._id.toString(),
      employee: {
        employeeId: doc.employeeId?._id ?? "",
        name: doc.employeeId?.name ?? "",
        email: doc.employeeId?.email ?? "",
      },
      product: Array.isArray(doc.productId)
        ? doc.productId.map((p: any) => ({
            productId: p._id?.toString() ?? "",
            name: p.name ?? "",
            description: p.description ?? "",
          }))
        : [],
    };
  }
}
export const SaleRepository = new MongoSaleRepository();
