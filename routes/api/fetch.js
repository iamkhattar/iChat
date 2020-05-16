const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const User = require("../../models/User");

/**
 * @route   GET api/auth
 * @desc    GET User by Token
 * @access  Private
 */
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    const { friends } = user;
    var response = [];
    for (friend of friends) {
      const currentFriendUser = await User.findById(friend).select("-password");
      const { id, name, image } = currentFriendUser;
      response.push({ id, name, url: image, messages: [] });
    }

    return res.json(response);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
