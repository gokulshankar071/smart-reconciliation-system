const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const userRoutes = require("./src/routes/userRoutes");
const app = express();
app.use(
  cors({
    origin: ["https://smart-reconciliation-system-ubq4.onrender.com"],
    credentials: true,
  }),
);
app.use(express.json());

app.use("/api/auth", require("./src/routes/authRoutes"));
app.use("/api/dashboard", require("./src/routes/dashboardRoutes"));
app.use("/api/upload", require("./src/routes/uploadRoutes"));
app.use("/api/reconciliation", require("./src/routes/reconciliationRoutes"));
app.use("/api/results", require("./src/routes/resultRoutes"));
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Smart Reconciliation Backend Running");
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT, () =>
      console.log(`Server running on ${process.env.PORT}`),
    );
  })
  .catch((err) => console.error(err));
