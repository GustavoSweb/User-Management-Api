const User = require("../models/User");
const Validation = require("../utils/Validation");
class UserController {
  async GetUsers(req, res) {
    try {
      let tst = await User.findAll();
      res.json(tst);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  }
  async CreateUser(req, res) {
    const { name, role, email, password } = req.body;
    try {
      await new Validation({ name, role, email, password }, ["role"]).Check();
      await User.create({ name, role, email, password });
      res.status(200).json({ message: "Success, User Created" });
    } catch (err) {
      if (err.name == "NotValid")
        return res.status(400).json({ err: err.message });
      res.sendStatus(500);
    }
  }
}

module.exports = new UserController();
