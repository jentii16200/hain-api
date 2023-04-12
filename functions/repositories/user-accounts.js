const { db, admin } = require("../util/firebase-init");
const {
  changeUsernameRepo,
  changeBirthdayRepo,
  changeFirstNameRepo,
  changeLastNameRepo,
  changeChangePasswordRepo,
  changeGenderRepo,
  changeAddressRepo,
  changeEmailRepo,
  changeProfileRepo,
  changeMobile,
  registerViaFacebookOrGoogle,
} = require("./controllers/user-account-controller");
const {
  storage,
  ref,
  uploadString,
  getDownloadURL,
} = require("../util/firebase-setup");
exports.login = async (req, res) => {
  const data = req.body.data;
  const userAccountRef = await db
    .collection("UserDetails")
    .where("userName", "==", data.userName)
    .where("password", "==", data.password)
    .get();
  console.log(userAccountRef.docs.length);
  if (userAccountRef.docs.length == 0) {
    res.send({ status: 200, message: "fail", result: {} });
    return;
  }
  const userDocs = userAccountRef.docs[0].data();
  userDocs.id = userAccountRef.docs[0].id;
  res.send({ status: 200, message: "success", result: userDocs });
  return;
};

exports.register = async (req, res) => {
  try {
    const data = req.body.data;
    data.foodAllergy = [];
    data.address = [];
    data.phone = 0;
    data.name = "";
    data.birthday = null;
    data.firstName = "";
    data.lastName = "";
    data.fcmToken = "";
    data.imgUrl = "";
    data.authToken = "customer";
    data.googleId = "";
    data.facebookId = "";
    await db
      .collection("UserDetails")
      .add(data, { merge: true })
      .then(async (val) => {
        await db
          .collection("UserDetails")
          .doc(val.id)
          .collection("Likes")
          .doc("result")
          .set({ likesArray: [] }, { merge: true });
        res.send({ status: 200, message: "success", result: "success" });
      });
  } catch (error) {
    res.send({ status: 200, message: "fail", result: {} });
  }
};

exports.deleteAccount = async (req, res) => {
  const accountId = req.body.accountId;
  await db.collection("UserDetails").doc(accountId).delete();
};

exports.getUserAccounts = async (req, res) => {
  try {
    const container = [];
    await db
      .collection("UserDetails")
      .get()
      .then((val) => {
        val.forEach((doc) => {
          container.push({ ...doc.data(), id: doc.id });
          console.log(doc.data());
        });
        res.send(container);
      });
  } catch (error) {
    res.send({ error: error.messsage });
  }
};

exports.addUserAllergy = async (req, res) => {
  const id = req.body.id;
  const allergy = req.body.allergy;

  await db
    .collection("UserDetails")
    .doc(id)
    .set({ foodAllergy: allergy }, { merge: true });

  res.send({
    status: 200,
    message: "success",
    result: "successfully add allergy to user!",
  });
};

exports.getUserDetailsData = async (req, res) => {
  const id = req.body.id;

  const userDetailsRef = await db.collection("UserDetails").doc(id).get();
  const userDetailsData = userDetailsRef.data();
  userDetailsData.id = id;
  res.send({
    status: 200,
    message: "success",
    result: userDetailsData,
  });
  return;
};
exports.updateWebAccount = async (req, res) => {
  try {
    const id = req.body.id;
    const data = req.body.data;
    await db
      .collection("UserDetails")
      .doc(id)
      .set({ ...data }, { merge: true });
    console.log(`SUCCESSFULLY CHANGE ${id} ${data} `);
    res.send({ status: 200, message: "success" });
  } catch (error) {
    console.log({ status: 200, message: error.message });
    res.send({ status: 200, message: error.message });
  }
};

// ? FOR CUSTOMER UPDATE ACCOUNT
exports.updateAccount = async (req, res) => {
  try {
    const type = req.body.type;
    const id = req.body.id;
    const strChange = req.body.strChange;

    if (type == "username") {
      await changeUsernameRepo(id, strChange);
    }
    if (type == "email") {
      await changeEmailRepo(id, strChange);
    }
    if (type == "birthday") {
      await changeBirthdayRepo(id, strChange);
    }
    if (type == "gender") {
      await changeGenderRepo(id, strChange);
    }
    if (type.firstName) {
      await changeFirstNameRepo(id, strChange);
    }
    if (type.lastName) {
      await changeLastNameRepo(id, strChange);
    }
    if (type == "changepassword") {
      await changeChangePasswordRepo(id, strChange);
    }
    if (type == "mobilenumber") {
      await changeMobile(id, strChange);
    }

    console.log(`SUCCESSFULLY CHANGE ${id} ${type} ${strChange}`);
    res.send({ status: 200, message: "success" });
  } catch (error) {
    res.send({
      result: error.message,
      message: "error",
      status: 200,
    });
  }
};
exports.changePicture = async (req, res) => {
  try {
    const id = req.body.id;
    const base64Image = req.body.base64Image;
    let doclink = "";

    const reference = ref(storage, `${id}/documents/profile_${new Date()}.png`);
    console.log("running /editProfile...");
    console.log(
      `running /editProfile...  ${id}/documents/profile_${new Date()}.png`
    );
    await uploadString(reference, base64Image, "base64").then(
      async (snapshot) => {
        await getDownloadURL(snapshot.ref).then((url) => {
          doclink = url;
        });
      }
    );
    await changeProfileRepo(id, doclink);
    console.log({
      result: doclink,
      message: "successfully  updated an  account",
      status: 200,
    });
    res.send({
      result: doclink,
      message: "successfully updated an account",
      status: 200,
    });
  } catch (e) {
    console.log({
      result: e.message,
      message: "error",
      status: 200,
    });
    res.send({
      result: e.message,
      message: "error",
      status: 200,
    });
  }
};

exports.handleLinkGoogle = async (req, res) => {
  const id = req.body.id;
  const googleId = req.body.googleId;
  try {
    await db.collection("UserDetails").doc(id).update({ googleId: googleId });
  } catch (error) {
    res.send({
      result: error.message,
      message: "error",
      status: 200,
    });
  }
};
exports.handleLinkFacebook = async (req, res) => {
  const id = req.body.id;
  const facebookId = req.body.facebookId;
  try {
    await db
      .collection("UserDetails")
      .doc(id)
      .update({ facebookId: facebookId });
  } catch (error) {
    res.send({
      result: error.message,
      message: "error",
      status: 200,
    });
  }
};

exports.handleSignInGoogleOrFacebook = async (req, res) => {
  const accountId = req.body.accountId;
  const accountEmail = req.body.accountEmail;
  const type = req.body.type;
  const userDetailRef = await db
    .collection("UserDetails")
    .where(type, "==", accountId)
    .get();
  console.log(userDetailRef.docs.length);
  if (userDetailRef.docs.length == 0) {
    const registerViaGoogleOrFb = await registerViaFacebookOrGoogle(
      accountId,
      accountEmail,
      type
    );
    userDetailsSpecificRef = await db
      .collection("UserDetails")
      .id(registerViaGoogleOrFb)
      .get();
    userDetailsSpecificDoc = userDetailsSpecificRef.data();
    userDetailsSpecificDoc.id = registerViaGoogleOrFb;
    res.send({
      status: 200,
      message: "successfully register",
      result: userDetailsSpecificDoc,
    });
    return;
  }
  const userDocs = userDetailRef.docs[0].data();
  userDocs.id = userDetailRef.docs[0].id;
  res.send({ status: 200, message: "success", result: userDocs });
  return;
};
