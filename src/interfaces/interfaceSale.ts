export interface SaleResponse_As_Entity {
  saleId: string;
  employeeId: string;
  productId: string;
}
export interface SaleResponse_C_I {
  saleId: string;
  employee: {
    employeeId: string;
    name: string;
    email: string;
  };
  product: {
    productId: string;
    name: string;
    description: string;
  };
}
