const express = require("express");
const app = express();
const port = process.env.PGPORT || 3002;

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

require("dotenv").config();

const usersRouter = require("./routes/usersRouter");

app.use("/api/usersRouter", usersRouter);

app.listen(port, console.log(`Server is listening on port ${port}`));
