const pool = require("../config/db.js");

exports.account = async (req, res) => {
  try {
    //after passing the authorization middleware, the req.user has the payload : req.user = user.id
    const user = await pool.query(
      "SELECT * FROM users WHERE id = $1",
      [req.user]
    );
    res.json(user.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
};
