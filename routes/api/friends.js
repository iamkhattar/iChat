const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

/**
 * @route   GET api/auth
 * @desc    Add a friend
 * @access  Private
 */
router.post("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const friendUser = await User.findOne({ email: req.body.friend });

    const userID = user._id;
    const friendID = friendUser._id;
    console.log(friendUser);

    if (friendUser) return res.json(userID + " " + friendID);
    return res.json("Hello");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
