import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./config/db.js";
import userRoutes from "./routes/userRoutes.js"
import companyRoutes from "./routes/companyRoutes.js"
import applicationRoutes from "./routes/applicationRoutes.js"
import advertissementRoutes from "./routes/advertissementRoutes.js"
import errorHandling from "./middlewares/errorHandler.js";
dotenv.config();

const app = express();
const port = process.env.PORT;

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use("/api", userRoutes)
app.use("/api", companyRoutes)
app.use("/api", applicationRoutes)
app.use("/api", advertissementRoutes)

// ✅ Ajout d’une route de test sur la racine
app.get("/", (req, res) => {res.send("✅ API is running! Try GET /api/users");
    });


// Error handling middleware
app.use(errorHandling);

// Testing Postgres connection
app.get("/test", async(req, res) =>{
    const result = await pool.query("SELECT current_database()");
    res.send(`The database name is : ${result.rows[0].current_database}`);
})

// Server Running
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})