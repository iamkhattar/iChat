const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

/**
 * @route   POST api/auth
 * @desc    Add a friend
 * @access  Private
 */
router.post("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const friendUser = await User.findOne({ email: req.body.friend });

    const userID = user._id;
    const friendID = friendUser._id;

    if (user.email == friendUser.email) {
      return res
        .status(400)
        .json({ errors: [{ msg: "You cannot friend yourself" }] });
    }

    let alreadyFriends = false;
    user.friends.forEach((currentFriend) => {
      if (currentFriend._id.toString() == friendID.toString()) {
        alreadyFriends = true;
      }
    });

    if (alreadyFriends) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Already friends with the user" }] });
    }

    user.friends.push(friendID);
    await user.save();

    return res.json(user.friends);

    if (friendUser) return res.json(userID + " " + friendID);
    return res.json("Hello");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
