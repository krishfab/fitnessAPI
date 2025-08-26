const User = require("../models/User");
const bcrypt = require("bcrypt");
const auth = require("../auth");

// User registration
module.exports.register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, mobileNo, isAdmin } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(409).json({ message: "Email already registered" });

    const hashed = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      email,
      password: hashed,
      mobileNo,
      isAdmin: isAdmin || false
    });

    await user.save();
    return res.status(201).json({ message: "User registered successfully" });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

// User login
module.exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(404).send({ message: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).send({ message: "Invalid credentials" });

  const token = auth.createAccessToken(user);
  
    return res.send({access: token});
};

// Get user details
module.exports.getDetails = async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  if (!user) return res.status(404).json({ success: false, message: "User not found" });

  return res.status(200).json({ success: true, data: user });
};

//update profile
// Update user profile
module.exports.updateProfile = async (req, res) => {
  try {
    const { firstName, lastName, email, mobileNo } = req.body;

    // Find the user by ID from the token (req.user.id)
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Update fields only if they are provided
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (email) user.email = email;
    if (mobileNo) user.mobileNo = mobileNo;

    await user.save();

    // Return updated user data
    return res.status(200).json({ 
      success: true,
      data: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        mobileNo: user.mobileNo
      }
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

