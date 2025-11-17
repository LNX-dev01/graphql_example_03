export const typeDefs = `#graphql
  type Employee {
    employeeId: ID!
    name: String!
    email: String!
    role: Role!
  }
  type Role {
  roleId: ID!
  roleType: String!
  shiftType: String!
}

  type Product {
    productId: ID!
    name: String!
    description: String!
  }

  type Sale {
    saleId: ID!
    employee: Employee!
    product: [Product!]!
  }
  type DASHBOARD_DATA{
    employees:[Employee!]
    roles:[Role!]
    products:[Product!]
    sales:[Sale!]
 }
#******************************************************************
  type Query {
    employees: [Employee!]
    roles: [Role!]
    products: [Product!]
    sales: [Sale!]
    dashboard_data:DASHBOARD_DATA!
  }
  type ResponseMessage{
    success:Boolean!
    message:String!
  }

#******************************************************************
  type Mutation {
    #Register✅
    addEmployee(name: String!, email: String!, roleId: String!): ResponseMessage
    addRole(roleType: String!, shiftType: String!): ResponseMessage
    addProduct(name: String!, description: String!): ResponseMessage
    addSale(employeeId:String!, productId: [String!]): ResponseMessage
    #Update💻
    updateEmployee(employeeId:String!, name:String, email:String, roleId:String):ResponseMessage
    updateRole(roleId:String!, roleType:String, shiftType:String):Role
    updateProduct(productId:String!, name:String, description:String,):Product
    updateSale(saleId:String!,employeeId:String!,productId:[String!]):Sale
    #Delete⛔
    deleteEmployee(employeeId:String!):ResponseMessage
    deleteRole(roleId:String!):ResponseMessage
    deleteProduct(productId:String!):ResponseMessage
    deleteSale(saleId:String!):ResponseMessage
  }
`;
