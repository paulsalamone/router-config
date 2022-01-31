const pool = require("../config");

function checkUser(req, res, next) {
  const { id } = req.params;
  pool.query(`Select * from users where id = $1`, [id]).then((data) => {
    if (!data.rows || data.rows.length === 0) {
      return res.sendStatus(404);
    }
    next();
  });
}

module.exports = checkUser;
