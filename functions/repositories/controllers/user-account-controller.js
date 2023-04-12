const { db } = require("../../util/firebase-init");

exports.changeUsernameRepo = async (id, string) => {
  await db
    .collection("UserDetails")
    .doc(id)
    .set({ userName: string }, { merge: true });
};
exports.changeBirthdayRepo = async (id, string) => {
  const date = new Date(string);
  await db
    .collection("UserDetails")
    .doc(id)
    .set({ birthday: date }, { merge: true });
};
exports.changeFirstNameRepo = async (id, string) => {
  await db
    .collection("UserDetails")
    .doc(id)
    .set({ firstName: string.firstName }, { merge: true });
};
exports.changeLastNameRepo = async (id, string) => {
  await db
    .collection("UserDetails")
    .doc(id)
    .set({ lastName: string.lastName }, { merge: true });
};
exports.changeChangePasswordRepo = async (id, string) => {
  await db
    .collection("UserDetails")
    .doc(id)
    .set({ password: string }, { merge: true });
};
exports.changeGenderRepo = async (id, string) => {
  await db
    .collection("UserDetails")
    .doc(id)
    .set({ gender: string }, { merge: true });
};
// TODO COMPLEXXX
exports.changeAddressRepo = async (id, string) => {
  await db
    .collection("UserDetails")
    .doc(id)
    .set({ regContact: parseInt(string) }, { merge: true });
};
exports.changeProfileRepo = async (id, string) => {
  await db
    .collection("UserDetails")
    .doc(id)
    .set({ imgUrl: string }, { merge: true });
};
exports.changeEmailRepo = async (id, string) => {
  await db
    .collection("UserDetails")
    .doc(id)
    .set({ email: string }, { merge: true });
};
exports.changeMobile = async (id, string) => {
  await db
    .collection("UserDetails")
    .doc(id)
    .set({ phone: parseInt(string) }, { merge: true });
};

exports.registerViaFacebookOrGoogle = async (id, email, type) => {
  const obj = {
    foodAllergy: [],
    name: "",
    address: [],
    email: email,
    phone: 0,
    message: "",
    userName: "",
    gender: "",
    firstName: "",
    lastName: "",
    imgUrl: "",
    birthday: null,
    remarks: "",
    password: "",
    facebookId: type == "facebookId" ? id : "",
    googleId: type == "googleId" ? id : "",
  };

  await db
    .collection("UserDetails")
    .add(obj, { merge: true })
    .then(async (val) => {
      await db
        .collection("UserDetails")
        .doc(val.id)
        .collection("Likes")
        .doc("result")
        .set({ likesArray: [] }, { merge: true });
      return val.id;
    });
};
