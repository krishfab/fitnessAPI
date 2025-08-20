const User = require("../models/User");
const bcrypt = require("bcrypt");
const auth = require("../auth");

module.exports.register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, mobileNo, isAdmin } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).send({ message: "Email already registered" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      email,
      password: hashed,
      mobileNo,
      isAdmin: isAdmin || false, 
    });

    await user.save();

    res.status(201).send({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).send({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).send({ message: "Invalid credentials" });

    const token = auth.createAccessToken(user);
    res.status(200).send({ access: token });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};


module.exports.getDetails = async (req, res) => {
  try {
    // req.user is set by verify middleware
    const userId = req.user.id;

    const user = await User.findById(userId).select("-password"); // exclude password
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};