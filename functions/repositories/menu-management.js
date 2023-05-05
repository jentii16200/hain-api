const { db } = require("../util/firebase-init");
const {
  storage,
  ref,
  uploadString,
  getDownloadURL,
} = require("../util/firebase-setup");
//  Menu Management
//  Model = {
//      image: url
//      dish:
//      price:
//      ingredients: []
//  }

exports.addMenu = async (req, res) => {
  // try {
  const data = req.body.data;
  const base64Image = req.body.base64Image;
  console.log(data);
  try {
    const menuref = await db.collection("Menu").doc(data.name).get();
    const menuDoc = menuref.data();
    if (menuDoc != null) {
      res.send({
        result: "menu already exists!",
        message: "The dish is already at the menu!",
      });
      return;
    }
  } catch (error) {}

  let doclink = "";

  const reference = ref(
    storage,
    `${data.name}/documents/profile_${new Date()}.png`
  );
  console.log("running /editProfile...");
  console.log(
    `running /editProfile...  ${data.name}/documents/profile_${new Date()}.png`
  );
  await uploadString(reference, base64Image, "base64").then(
    async (snapshot) => {
      await getDownloadURL(snapshot.ref).then((url) => {
        doclink = url;
      });
    }
  );
  data.imageUrl = doclink;

  await db
    .collection("Menu")
    .doc(data.name)
    .set(data)
    .then((val) => {
      res.send({
        result: "Success",
        message: "Menu successfully added!",
      });
    });
  // } catch (error) {
  //   res.send({
  //     result: error.message,
  //     message: "Error",
  //   });
  // }
};

exports.deleteMenu = async (req, res) => {
  const idMenu = req.body.idMenu;
  await db.collection("Menu").doc(idMenu).delete();
};

exports.getMenu = async (req, res) => {
  try {
    const container = [];

    const type = req.body.type;
    const menu = await db.collection("Menu").where("type", "==", type).get();
    menu.forEach((doc) => {
      let obj = {};
      obj = { id: doc.id, ...doc.data() };

      container.push(obj);
    });
    res.send(container);
  } catch (error) {
    res.send({ error: error.messsage });
  }
};

exports.updateMenu = async (req, res) => {
  try {
    const id = req.body.id;
    const data = req.body.data;
    const base64Image = req.body.base64Image;
    let doclink = "";
    try {
      const reference = ref(
        storage,
        `${id}/documents/profile_${new Date()}.png`
      );
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
      data.imageUrl = doclink;
    } catch (error) {}

    await db.collection("Menu").doc(id).update(data);
    res.send({ message: "success", status: 200 });
  } catch (error) {
    res.send({ message: "fail", status: 200, error: error.message });
  }
};
exports.getAllMenu = async (req, res) => {
  try {
    const container = [];

    const menu = await db.collection("Menu").get();
    menu.forEach((doc) => {
      let obj = {};
      obj = { id: doc.id, ...doc.data() };

      container.push(obj);
    });
    res.send({ result: container, status: 200 });
  } catch (error) {
    res.send({ error: error.messsage });
  }
};
