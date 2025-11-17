import { EmployeeRepository } from "../repositories/mongoEmployee.repository";
import { RoleRepository } from "../repositories/mongoRole.repository";
import { ProductRepository } from "../repositories/mongoProduct.repository";
import { SaleRepository } from "../repositories/mongoSale.repository";
import { BaseError } from "../Errors/error.graphqlError";
import { log } from "console";
// import { GraphQLError } from "graphql";

export const resolvers = {
  Query: {
    employees: () => EmployeeRepository.findAll(),
    roles: () => RoleRepository.findAll(),
    products: () => ProductRepository.findAll(),
    sales: () => SaleRepository.findAll(),
  },
  Mutation: {
    /********************💻Register☺️✅********************* */
    addEmployee: async (_: any, { name, email, roleId }: { name: string; email: string; roleId: string }) => {
      const newEmployee = await EmployeeRepository.save({ name, email, roleId });
      // if(!newEmployee) throw new Error("Dailed to add employee");
      // if(!newEmployee) throw new GraphQLError("Dailed to add employee");
      if (!newEmployee)
        throw new BaseError({ message: "Failed to add employee", code: "ADD_EMPLOYEE_FAILED", status: 404 });

      return { success: true, message: "Employee added successfully" };
    },

    addRole: async (_: any, { roleType, shiftType }: { roleType: string; shiftType: string }) => {
      const newRole = await RoleRepository.save({ roleType, shiftType });
      if (!newRole) throw new BaseError({ message: "Failed to add role", code: "ADD_ROLE_FAILED", status: 404 });
      return { success: true, message: "Role added successfully" };
    },

    addProduct: async (_: any, { name, description }: { name: string; description: string }) => {
      const newProduct = await ProductRepository.save({ name, description });
      if (!newProduct)
        throw new BaseError({ message: "Failed to add product", code: "ADD_PRODUCT_FAILED", status: 404 });
      return { success: true, message: "Product added successfully" };
    },

    addSale: async (_: any, { employeeId, productId }: { employeeId: string; productId: string[] }) => {
      log(employeeId, productId);
      const newSale = await SaleRepository.save({ employeeId, productId });
      if (!newSale) throw new BaseError({ message: "Failed to add sale", code: "ADD_SALE_FAILED", status: 404 });
      return { success: true, message: "Sale added successfully" };
    },

    /********************💻Update✨🫡********************** */
    updateEmployee: async (_: any, { employeeId, name, email, roleId }) => {
      const employeeData = { employeeId, name, email, roleId };
      const updatedEmployee = await EmployeeRepository.update(employeeData);
      // return !!updatedEmployee
      if (!updatedEmployee)
        throw new BaseError({ message: "Employee not updated", code: "UPDATE_EMPLOYEE_FAILED", status: 404 });
      return { success: true, message: "Employee updated successfully" };
    },
    updateRole: async (_: any, { roleId, roleType, shiftType }) => {
      const roleData = { roleId, roleType, shiftType };
      const updatedRole = await RoleRepository.update(roleData);
      if (!updatedRole) throw new BaseError({ message: "Role not updated", code: "UPDATE_ROLE_FAILED", status: 404 });
      return { success: true, message: "Role updated successfully" };
    },
    updateProduct: async (_: any, { productId, name, description }) => {
      const productData = { productId, name, description };
      const updatedProduct = await ProductRepository.update(productData);
      if (!updatedProduct)
        throw new BaseError({ message: "Product not updated", code: "UPDATE_PRODUCT_FAILED", status: 4004 });
      return { success: true, message: "Product updated successfully" };
    },
    updateSale: async (_: any, { saleId, employeeId, productIds }) => {
      const productData = { saleId, employeeId, productIds };
      const updatedSale = await ProductRepository.update(productData);
      if (!updatedSale) throw new BaseError({ message: "Sale not updated", code: "UPDATE_SALE_FAILED", status: 4004 });
      return { success: true, message: "Sale updated successfully" };
    },
    /********************💻Delete☹️⛔********************** */
    deleteEmployee: async (_: any, { employeeId }) => {
      const deleted = await EmployeeRepository.deleteEmployee(employeeId);
      return { success: deleted, message: `Deleted Employee: ${employeeId}` };
    },

    deleteRole: async (_: any, { roleId }) => {
      const deleted = await RoleRepository.deleteRole(roleId);
      return { success: deleted, message: `Deleted Role: ${roleId}` };
    },

    deleteProduct: async (_: any, { productId }) => {
      const deleted = await ProductRepository.deleteProduct(productId);
      return { success: deleted, message: `Deleted Product: ${productId}` };
    },

    deleteSale: async (_: any, { saleId }) => {
      const deleted = await SaleRepository.deleteSale(saleId);
      return { success: deleted, message: `Deleted Sale: ${saleId}` };
    },
  },
};
