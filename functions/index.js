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
} = require("./repositories/order");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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

// Remarks
app.post("/createRemarks", createRemarks);
app.get("/getRemarks", getRemarks);

app.listen(4020, () => {
  console.log("running on port 1");
});

exports.api = functions.runWith({ memory: "1GB" }).https.onRequest(app);
