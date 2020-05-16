const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const Messages = require("../../models/Messages");

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
    friendUser.friends.push(userID);
    await user.save();
    await friendUser.save();

    const senderMessage = new Messages({
      sender: user,
      receiver: friendUser,
      history: [],
    });

    const receiverMessage = new Messages({
      sender: friendUser,
      receiver: user,
    });

    await senderMessage.save();
    await receiverMessage.save();

    return res.json(user.friends);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
