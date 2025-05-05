const express = require("express");
const router = express.Router();

const users = [
  { username: "admin", password: "admin123", role: "admin" },
  { username: "executive", password: "exec123", role: "executive" }
];

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    res.json({ user: { username: user.username, role: user.role } });
  } else {
    res.status(401).json({ error: "Invalid credentials" });
  }
});

module.exports = router;
