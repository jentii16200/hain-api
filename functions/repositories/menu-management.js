const { db } = require("../util/firebase-init");
//  Menu Management
//  Model = {
//      image: url
//      dish:
//      price:
//      ingredients: []
//  }

exports.addMenu = async (req, res) => {
  const data = req.body.data;
  const menuref = await db.collection("Menu").doc(data.name).get();
  const menuDoc = menuref.data();
  if (menuDoc != null) {
    res.send({
      result: "menu already exists!",
      message: "The dish is already at the menu!",
    });
    return;
  }
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
    await db
      .collection("Menu")
      .doc(id)
      .set({ ...data }, { merge: true });
    res.send({ message: "success", status: 200 });
  } catch (error) {
    res.send({ message: "fail", status: 200, error: error.message });
  }
};
