const User = require("../models/User");
const bcrypt = require("bcrypt");
const auth = require("../auth");

// User registration
module.exports.register = async (req, res) => {
  const { firstName, lastName, email, password, mobileNo, isAdmin } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) return res.status(409).send({ message: "Email already registered" });

  const hashed = await bcrypt.hash(password, 10);

  const user = new User({ firstName, lastName, email, password: hashed, mobileNo, isAdmin: isAdmin || false });
  await user.save();
  return res.status(201).send({ message: "User registered successfully" });
};

// User login
module.exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(404).send({ message: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).send({ message: "Invalid credentials" });

  const token = auth.createAccessToken(user);
  return res.status(200).send({ access: token });
};

// Get user details
module.exports.getDetails = async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  if (!user) return res.status(404).json({ success: false, message: "User not found" });

  return res.status(200).json({ success: true, data: user });
};
