const db = require("../models");
const User = db.user;
const Role = db.role;

exports.adminBoard = async (req, res) => {
  const users = await User.findAll({
    attributes: {exclude: ['user_password']}
  })
  res.status(200).send(users);
};

exports.deleteUser = async (req, res) => {
  const userID = parseInt(req.params.id)
  const toDelete = await User.destroy({where : {user_id: userID}});
  res.status(200).send()
}