const UserModel = require("../models/user.model");
const ObjectID = require("mongoose").Types.ObjectId;
const bcrypt = require("bcrypt");

module.exports.getAllUsers = async (req, res) => {
  const users = await UserModel.find().select("-password");
  res.status(200).json(users);
};

module.exports.userInfo = (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send("ID unknown : " + req.params.id);
  }
  UserModel.findById(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("ID unknown : " + err);
  }).select("-password");
};

module.exports.updateUser = async (req, res) => {
  const { email, password, newPassword } = req.body;

  try {
    if (newPassword.length < 6)
      return res.status(200).send({
        error: "Le nouveau mot de passe doit faire 6 caractères minimum",
      });

    const user = await UserModel.login(email, password);
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(newPassword, salt);

    await UserModel.findByIdAndUpdate(
      { _id: user._id },
      {
        $set: {
          password: hash,
        },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true },
      (err, docs) => {
        if (!err) return res.send(docs);
        if (err)
          return res.status(200).send({
            error: "Le nouveau mot de passe doit faire 6 caractères minimum",
          });
      }
    );
  } catch (err) {
    return res.status(200).json({ error: "Mauvais mot de passe" });
  }
};

module.exports.deleteUser = async (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send("ID unknown : " + req.params.id);
  }
  try {
    await UserModel.deleteOne({ _id: req.params.id }).exec();
    res.status(200).json({ message: "Successfully deleted." });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};
