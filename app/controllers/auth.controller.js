const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { sendVerificationMail } = require("../nodemail/sendVerificationMail.js");

exports.signup = async (req, res) => {
  // Save User to Database
  try {
    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      user_password: bcrypt.hashSync(req.body.user_password, 8),
      verification_token: jwt.sign({ username: req.body.username },
        config.secret,
        {
          algorithm: 'HS256',
          allowInsecureKeySizes: true,
          expiresIn: 86400, // 24 hours
        })
    });

    sendVerificationMail(user)

    if (req.body.roles) {
      const roles = await Role.findAll({
        where: {
          role_name: {
            [Op.or]: req.body.roles,
          },
        },
      });

      const result = user.setRoles(roles);
      if (result) res.send({ message: "User registered successfully! A verification mail has been sent to your account." });
    } else {
      // user has role = 1
      const result = user.setRoles([1]);
      if (result) res.send({ message: "User registered successfully! A verification mail has been sent to your account." });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.signin = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (!user) {
      return res.status(401).send({ message: "username or password incorrect." });
    }

    if (user.is_verified == false) {
      return res.status(401).send({ message: "Please verifiy your email before signin." })
    }

    const passwordIsValid = bcrypt.compareSync(
      req.body.user_password,
      user.user_password
    );

    if (!passwordIsValid) {
      return res.status(401).send({
        message: "username or password incorrect.",
      });
    }

    const token = jwt.sign({ user_id: user.user_id },
      config.secret,
      {
        algorithm: 'HS256',
        allowInsecureKeySizes: true,
        expiresIn: 86400, // 24 hours
      });

    let authorities = [];
    const roles = await user.getRoles();
    for (let i = 0; i < roles.length; i++) {
      authorities.push("ROLE_" + roles[i].role_name.toUpperCase());
    }

    req.session.token = token;

    return res.status(200).send({
      user_id: user.user_id,
      username: user.username,
      email: user.email,
      roles: authorities,
      created_at: user.created_at
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

exports.verifyEmail = async (req, res) => {
  try {
    const emailToken = req.body.emailToken;

    if (!emailToken) {
      return res.status(404).send({ message: "Email Token not found" })
    }

    const user = await User.findOne({
      where: {
        verification_token: emailToken,
      },
    })

    if (user) {

      await user.update(
        {
          verification_token: null,
          is_verified: true
        }
      )

      res.status(200).send({ message: "Verification successfull" })
    } else {
      res.status(404).send({ message: "Verfication failed, invalid token" })
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message)
  }
}

exports.signout = async (req, res) => {
  try {
    req.session = null;
    return res.status(200).send({
      message: "You've been signed out!"
    });
  } catch (err) {
    this.next(err);
  }
};