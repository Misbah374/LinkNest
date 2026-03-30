import express from "express"
import cors from "cors"
import linkRoutes from "./routes/linkRoutes";
import authRoutes from "./routes/authRoutes";
import categoryRoutes from "./routes/categoryRoutes";
import { redirectLink } from "./controllers/linkController";

const app = express()

app.use(cors())
app.use(express.json())
app.use("/links", linkRoutes);
app.use("/auth", authRoutes)
app.use("/categories", categoryRoutes)
app.get("/", (req, res) => {
  res.send("LinkNest API running")
})

app.get("/:shortcode", redirectLink);

export default app;