import { json } from "express";
import express from "express";
import cors from "cors";
import routes from "./routes/index.js";

const app = express();

app.use(cors())
app.use(json());

// Routes
app.use("/api", routes);

export default app;