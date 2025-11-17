## 🧩 Project Description (v_base_03)

This repository contains the **third base version** of a GraphQL API built with **Node.js**, **TypeScript**, and **Apollo Server**.  
In this version, the project has evolved beyond mock arrays and now includes:

- **Fully implemented Mongoose models**
- **Repository layer with CRUD operations**
- **Custom error handling using GraphQLError**
- **Consistent return messages for mutations and queries**
- **Improved project structure and modular design**

The API simulates a small **Sales Store system**, managing the relationships between **Employees**, **Roles**, **Products**, and **Sales**, showcasing a clean and scalable GraphQL architecture.


<p> <img src="https://img.shields.io/badge/Node.js-24.11.1.x-green" /> <img src="https://img.shields.io/badge/TypeScript-5.9.3x-blue" /> <img src="https://img.shields.io/badge/GraphQL_v5.0.0-ApolloServer-orange" /> </p>
---

## 📌 Entities Included

- **Employee**
- **Role**
- **Product**
- **Sale**

Each entity includes:

- Create
- Update
- Delete
- List / Query

---

## 🛠️ Tools & Dependencies

<p align="left"style="margin-left: 50px;">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=typescript,nodejs,apollo,graphql" />
  </a>
</p>

| Dependency          | Purpose                                       |
| ------------------- | --------------------------------------------- |
| Apollo Server       | GraphQL Server Implementation                 |
| GraphQL             | Query Language & Schema                       |
| TypeScript          | Mongo IDs                           |
| Chalk               | Console Banner Styling                        |
| Dotenv              | Environment Configuration                     |
| Mongoose            | Database layer placeholder / future extension |

---

## 🧠 Key Concepts Covered

1. Definition of **Schemas (typeDefs)** and **Resolvers**.
2. Definition of **models (mongoose)**.
2. Definition of **Methods Mongoose (repositories)**.
3. Organizational of structures.
4. Error handling **GraphQLError**.

---

# Example Mutation
### Add_Product

```
mutation Mutation($name: String!, $description: String!) {
  addProduct(name: "Bottle of water", description: "1 lt.") {
    success
    message
  }
}
```

## Result_product

```
{
  "data": {
    "addProduct": {
      "success": true,
      "message": "Product added successfully"
    }
  }
}
```

# Example Query
### Query_product
```
query Query {
  products {
    productId
    name
    description
  }
}
```

## Result_Product

```
{
  "data": {
    "products": [
      {
        "productId": "691b8cb11a1c92f5ed524991",
        "name": "Bottle of water",
        "description": "1 lt."
      }
    ]
  }
}
```