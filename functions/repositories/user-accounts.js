const { db, admin } = require("../util/firebase-init");

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
    data.address = "";
    data.phone = 0;
    data.name = "";
    await db
      .collection("UserDetails")
      .add(data, { merge: true })
      .then((val) => {
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

exports.updateAccount = async (req, res) => {
  const data = req.body.data;
  const accountId = req.body.accountId;

  await db.collection("UserDetails").doc(accountId).update(data);
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
