const User = require("../models/User");
const Validation = require("../utils/Validation");
class UserController {
  async GetUsers(req, res) {
    try {
      const data = await User.findAll();
      res.status(200).json(data);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  }
  async CreateUser(req, res) {
    const { name, role, email, password } = req.body;
    try {
      await new Validation({ name, role, email, password }, ["role"]).Check();
      const user = await User.findOne({ email });
      if (user[0])
        // varificando se a algo no array user
        return res.status(409).json({ err: "Usuario ja cadastrado" });
      await User.create({ name, role, email, password });
      res.status(200).json({ message: "Success, User Created" });
    } catch (err) {
      if (err.name == "NotValid")
        return res.status(400).json({ err: err.message });
      res.sendStatus(500);
    }
  }
  async FindUser(req, res){
    const {id} = req.params
    try{
      const data = await User.findById(id)
      if(data) return res.status(200).json(data)
      return res.status(404).json({})
    }catch(err){
      res.sendStatus(500)
    }
  }
}

module.exports = new UserController();
