import { ProductModel } from "../models/product.schema";
import { ProductResponseInterface } from "../interfaces/interfaceProduct";

export class MongoProductRepository {
  async findAll(): Promise<ProductResponseInterface[]> {
    const docs = await ProductModel.find();
    return docs.map(this.toDomainPlain);
  }
  async save(product: any): Promise<ProductResponseInterface> {
    const created = new ProductModel(this.toPersistence(product));
    const saved = await created.save();
    return this.toDomainPlain(saved);
  }
  async update(product: any): Promise<ProductResponseInterface> {
    const updated = await ProductModel.findOneAndUpdate(
      { _id: product.productId },
      this.toPersistence(product),
      { new: true }
    );
    if (!updated) throw new Error("Product not found for update");
    return this.toDomainPlain(updated);
  }
 async deleteProduct(id: any): Promise<boolean> {
    try {
      const deleted = await ProductModel.findByIdAndDelete(id);
      return !!deleted;
    } catch {
      return false;
    }
  }
  private toPersistence(product: any) {
    return {
      name: product.name,
      description: product.description,
    };
  }

  private toDomainPlain(doc: any): ProductResponseInterface {
    return {
      productId: doc.id.toString(),
      name: doc.name ?? "",
      description: doc.description ?? "",
    };
  }
}
export const ProductRepository = new MongoProductRepository();
