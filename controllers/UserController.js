const PasswordToken = require("../models/PasswordToken");
const User = require("../models/User");
const Validation = require("../utils/Validation");
class UserController {
  async DeleteUser(req, res) {
    const { id } = req.params;
    try {
      await User.delete({ id });
      res.status(200).json({ message: "Usuario deletado" });
    } catch (err) {
      console.log(err.name);
      if (err.name == "NotExistValue")
        return res.status(404).json({ err: err.message });
      res.sendStatus(500);
    }
  }
  async GetUsers(req, res) {
    try {
      const data = await User.findAll();
      res.status(200).json(data);
    } catch (err) {
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
      if (err.name == "ConflictData")
        return res.status(409).json({ err: "Usuario ja cadastrado" });
      res.sendStatus(500);
    }
  }
  async FindUser(req, res) {
    const { id } = req.params;
    try {
      const data = await User.findById(id);
      if (data) return res.status(200).json(data);
      return res.status(404).json({});
    } catch (err) {
      res.sendStatus(500);
    }
  }
  async UpdateUser(req, res) {
    const { id } = req.params;
    const { name, email, role } = req.body;
    if (!name && !email && !role)
      return res.status(400).json({ err: "Falta de parametros" });
    try {
      await User.update({ id, data: { name, email, role } });
      res.status(200).json({ message: "User Update" });
    } catch (err) {
      if (err.name == "NotExistValue")
        return res.status(404).json({ err: err.message });
      if (err.name == "NotValid")
        return res.status(400).json({ err: err.message });
      res.sendStatus(500);
    }
  }
  async ChangePassword(req, res) {
    try {
      const { token, password } = req.body;
      await new Validation({ token, password }).Check();

      const data = await PasswordToken.validate({ token });
      await User.chengePassword({ token, password, id: data[0].user_id });
      await PasswordToken.AlterStatus({token})
      res.status(200).json({ message: "Password change" });
    } catch (err) {
      console.log(err)
      if (err.name == "NotExistValue")
        return res.status(404).json({ err: err.message });
      if (err.name == "NotValid")
        return res.status(400).json({ err: err.message });
      res.sendStatus(500);
    }
  }
}

module.exports = new UserController();
