import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";

// @desc Auth User & get token
// @route POST /api/users/login
// @access Public
const authUser = asyncHandler(async (req, res) => {
  res.send("Auth User");
});

// @desc Register user
// @route POST /api/users/signup
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  res.send("Register User");
});

// @desc Logout User & clear cookie
// @route POST /api/users/logout
// @access Private
const logoutUser = asyncHandler(async (req, res) => {
  res.send("Logout User");
});

// @desc Get User Profile
// @route POST /api/users/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
  res.send("Get User profile");
});

// @desc update User Profile
// @route PUT /api/users/profile
// @access Private
const updateUserProfile = asyncHandler(async (req, res) => {
  res.send("update User profile");
});

// @desc Get Users
// @route GET /api/users
// @access Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  res.send("get Users");
});

// @desc Get User by ID
// @route GET /api/users/:id
// @access Private/Admin
const getUserByID = asyncHandler(async (req, res) => {
  res.send("get User");
});

// @desc Delete User
// @route delete /api/users/:id
// @access Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  res.send("Delete User");
});

// @desc Update User
// @route PUT /api/users/:id
// @access Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  res.send("Update User");
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  updateUser,
  getUserByID,
};
