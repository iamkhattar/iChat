// const User = require("../models/User");
// const bcrypt = require("bcryptjs");

// exports.create = async (req, res, next) => {
//     await User.findOne({ email: req.body.email })
//         .then(email_exists => {
//             return res.status(409)
//         });
// }