import express from "express";
import dotenv from "dotenv";

dotenv.config();

const Port = process.env.PORT || 4000;

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(Port, () => {
  console.log(`Server running on http://localhost:${Port}`);
});
