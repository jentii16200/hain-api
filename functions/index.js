const functions = require("firebase-functions");
const express = require("express");
const app = express("express");
const cors = require("cors");

const {
  login,
  register,
  deleteAccount,
  updateAccount,
  getUserAccounts,
  addUserAllergy,
  getUserDetailsData,
  changePicture,
  updateWebAccount,
  handleLinkGoogle,
  handleLinkFacebook,
  handleSignInGoogleOrFacebook,
} = require("./repositories/user-accounts");
const {
  addMenu,
  deleteMenu,
  getMenu,
  updateMenu,
} = require("./repositories/menu-management");
const { createRemarks, getRemarks } = require("./repositories/remarks");
const {
  addOrder,
  rejectOrder,
  acceptOrder,
  onGoingOrder,
  doneOrder,
  getOrderLogs,
  newOrderStatus,
  getOrderUser,
} = require("./repositories/order");

const {
  updateLikesController,
  getAllLikesController,
  getAllSpecificLikesMenuController,
} = require("./repositories/likes");
app.use(express.json());
app.use(express.urlencoded({ limit: "25mb", extended: true }));
app.use(express.json({ limit: "25mb" }));
app.use(cors());
app.options("*", cors());

// USER ACCOUNTS
app.post("/login", login);
app.post("/register", register);
app.post("/deleteAccount", deleteAccount);
app.post("/updateAccount", updateAccount);
app.get("/getUserAccounts", getUserAccounts);
app.post("/addUserAllergy", addUserAllergy);
app.post("/getUserDetailsData", getUserDetailsData);
app.post("/changePicture", changePicture);

app.post("/updateWebAccount", updateWebAccount);

app.post("/handleLinkFacebook", handleLinkFacebook);
app.post("/handleLinkGoogle", handleLinkGoogle);
app.post("/handleSignInGoogleOrFacebook", handleSignInGoogleOrFacebook);
// MENU Management
app.post("/addMenu", addMenu);
app.post("/deleteMenu", deleteMenu);
app.post("/getMenu", getMenu);
app.post("/updateMenu", updateMenu);
// Order Logs
app.post("/addOrder", addOrder);
app.post("/rejectOrder", rejectOrder);
app.post("/acceptOrder", acceptOrder);
app.post("/onGoingOrder", onGoingOrder);
app.post("/doneOrder", doneOrder);
app.get("/getOrderLogs", getOrderLogs);
app.post("/newOrderStatus", newOrderStatus);
app.post("/getOrderUser", getOrderUser);

// Remarks
app.post("/createRemarks", createRemarks);
app.get("/getRemarks", getRemarks);

// LIKES
app.post("/updateLikes", updateLikesController);
app.post("/getAllLikes", getAllLikesController);
app.post("/getAllSpecificLikesMenu", getAllSpecificLikesMenuController);
app.listen(4020, () => {
  console.log("running on port 1");
});

exports.api = functions.runWith({ memory: "1GB" }).https.onRequest(app);
