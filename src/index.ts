import mongoose from "mongoose";
import dotenv from "dotenv";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./graphql_modular/typeDefs";
import { resolvers } from "./graphql_modular/resolvers";
import { logBanner } from "./banner/bannerColor";

dotenv.config();

const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGODB_URI || "mongodb://localhost:0000/library";
logBanner("💪😎 **Welcome Lanixsi**✅", "yellow");
async function startServer() {
  try {
    await mongoose.connect(MONGO_URI);
    logBanner(`✅ Connected to MongoDB ${PORT}`, "green");
    const server = new ApolloServer({
      resolvers,
      typeDefs,
    });
    const { url } = await startStandaloneServer(server, { listen: { port: 4000 } });
    logBanner(`🚀  Server ready at: ${url}/graphql`, "magenta");
  } catch (error: any) {
    // Type of error
    if (error.name === "MongooseServerSelectionError") {
      logBanner("❌ Database connection failed (MongoDB not reachable).", "red");
    } else if (error.message?.includes("EADDRINUSE")) {
      logBanner("⚠️ Port already in use. Try changing PORT in .env.", "yellow");
    } else {
      logBanner(`💥 Server error: ${error.message}`, "red");
    }
    process.exit(1);
  }
}
startServer();
