import express from "express";
import cors from "cors";
import productsRouter from "./products.router";
import mongoose from "mongoose";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// // Conexión a MongoDB (opcional, si quieres usar MongoDB real)
// const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/mydb";
// mongoose.connect(MONGO_URI)
//   .then(() => console.log("MongoDB conectado"))
//   .catch(err => console.error("Error MongoDB:", err));

// Mount the products router on the /api path
app.use("/api", productsRouter); // Corrected line

app.listen(PORT, () => {
  console.log(`API escuchando en http://localhost:${PORT}`);
});