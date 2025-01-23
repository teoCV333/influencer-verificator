import { json } from "express";
import express from "express";
const app = express();
import cors from "cors";

import routes from "./routes/index.js";

app.use(cors())
app.use(json());

// Routes
app.use("/api", routes);

export default app;