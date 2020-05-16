const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const User = require("../../models/User");

const { getMessages } = require("../actions/messages");

/**
 * @route   GET api/auth
 * @desc    GET User by Token
 * @access  Private
 */
router.get("/", auth, async (req, res) => {
  try {
    const response = await getMessages(req.user.id);
    return res.json(response);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
