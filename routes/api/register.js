const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secrettoken = require("../../config/keys").secrettoken;
const gravatar = require("gravatar");
const User = require("../../models/User");

/**
 * @route   POST /api/users
 * @desc    Register a User
 * @access  Public
 */
router.post("/", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Email already in use" }] });
    }
    const image = gravatar.url(email, {
      s: "500",
      r: "pg",
      d: "mm",
    });

    user = new User({
      name,
      email,
      image,
      password,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(payload, secrettoken, { expiresIn: 360000 }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    return res.status(500).send("Server Error");
  }
});

module.exports = router;
