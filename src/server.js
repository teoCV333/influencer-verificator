import app from "./app.js";
import { connectDB } from "./config/db.js";
import { env } from "./config/env.js";

connectDB();

app.listen(env.port, () => {
  console.log(`the server is running on port: ${env.port}`);
});
