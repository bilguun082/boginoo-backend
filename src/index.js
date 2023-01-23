const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const listRouter = require("./router/listRouter");
const userRouter = require("./router/userRouter");
const app = express();
require("dotenv").config();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use("/short", listRouter);
app.use("/user", userRouter);

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true });
mongoose.set("strictQuery", true);

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB amjilttai holbogdloo");
});

app.listen(port, () => {
  console.log(`server listening on ${port}`);
});
