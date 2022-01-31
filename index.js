const express = require("express");
const app = express();
const port = 3002;

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

require("dotenv").config();

const usersRouter = require("./routers/usersRouter");

app.use("/api/users", usersRouter);

app.listen(port, console.log(`Server is listening on port ${port}`));
