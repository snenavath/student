const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require('cors')

const app = express();
app.use(bodyParser.json());
app.use(cors());

const studentsRouter = require("./routes/student");
app.use("/students", studentsRouter);

const db = "mongodb://localhost/school";
mongoose
  .connect(db, { useNewUrlParser: true})
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.listen(5001, () => console.log("Server Running"));
