require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const app = express();

const PORT = 3000;

mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log(`Connected to MongoDB`);
});


const bookRouter = require("./routes/book");
const userRouter = require("./routes/user");

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/books", bookRouter);
app.use("/api/users", userRouter);