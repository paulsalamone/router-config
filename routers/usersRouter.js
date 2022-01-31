const usersRouter = require("express").Router();
const pool = require("../config");
const { body, validationResult } = require("express-validator");

const checkUser = require("../middlewares/checkUser");
// const Validator = require("../middlewares/Validator");

const Validator = [
  body("first_name").isLength({ min: 1, max: 50 }).isString().isAlpha() &&
    body("last_name").isLength({ min: 1, max: 50 }).isString().isAlpha(),
];

usersRouter.get("/", (req, res) => {
  pool
    .query("SELECT * FROM users")
    .then((data) => res.json(data.rows))
    .catch((err) => res.status(500).send(err));
});

usersRouter.get("/:id", checkUser, (req, res) => {
  const { id } = req.params;
  pool
    .query(`SELECT * FROM users WHERE id= $1;`, [id])
    .then((data) => res.json(data.rows))
    .catch((err) => res.status(500).send(err));
});

// POST / CREATE

usersRouter.post("/", Validator, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.sendStatus(400).json({ errors: errors.array() });
  }

  const { first_name, last_name } = req.body;
  pool
    .query(
      "INSERT INTO users(first_name, last_name) VALUES($1, $2) RETURNING *",
      [first_name, last_name]
    )
    .then((data) => res.json(data.rows))
    .catch((e) => res.sendStatus(404).send(e));
});

// PUT / UPDATE

usersRouter.put("/:id", checkUser, Validator, (req, res) => {
  const { id } = req.params;
  const { first_name, last_name } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.sendStatus(400).json({ errors: errors.array() });
  }
  pool
    .query(
      "UPDATE users SET first_name= $1, last_name=$2 WHERE id= $3 RETURNING *",
      [first_name, last_name, id]
    )
    .then((data) => res.status(200).json(data.rows))
    .catch((err) => res.status(404).send(err));
});

// DELETE
usersRouter.delete("/:id", checkUser, (req, res) => {
  const { id } = req.params;
  pool
    .query("DELETE FROM users WHERE id = $1 RETURNING *", [id])
    .then((data) => res.json(data))
    .catch((e) => res.sendStatus(500));
});

module.exports = usersRouter;
