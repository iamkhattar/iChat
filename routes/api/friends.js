const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

/**
 * @route   GET api/auth
 * @desc    Add a friend
 * @access  Private
 */
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const friendUser = await User.find({ email: req.body.friend });
    if (friendUser) return res.json(friendUser);
    return res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
