import cloudinary from "../lib/cloudinary.js";
import { generateJwtToken } from "../lib/generateJwt.js";
import User from "../models/auth.model.js";
import bcrypt from "bcryptjs";

export const Signup = async (req, res) => {
  const { fullName, password, email } = req.body;
  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are Required" });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be 6 chars" });
    }

    // check with email that if the user is already present or not
    // 400 => bad request
    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already present" });

    // creating salt to hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      generateJwtToken(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ message: "Invalid user Data" });
    }
  } catch (error) {
    console.log("Error in SignUp controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Login function
export const Login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and Password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const checkPass = await bcrypt.compare(password, user.password);
    if (!checkPass) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    generateJwtToken(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log("Error in Login controller", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Logout function here
export const Logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged Out successfully" });
  } catch (error) {
    console.log("Error in Logout controller", error.message);
    res.status(500).json({ message: "Intenal Server Error" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { profilePic } = req.body;

    // getting user from the cookie because we have implemented the protect route
    const userId = req.user._id;
    if (!profilePic) {
      return res.status(400).json({ message: "Profile Pic is required" });
    }

    const uploadResponse = await cloudinary.uploader.upload(profilePic);

    // updating user with the latest photo and we got the id by the protectRoute
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: uploadResponse.secure_url },
      { new: true },
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    console.log("Error in UpdateProfile controller ", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const checkAuth = (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    console.log("check auth is working properly");
    res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in CheckAuth controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
