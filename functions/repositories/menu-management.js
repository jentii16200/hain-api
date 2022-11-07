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
  const menuref = await db.collection("Menu").doc(data.dish).get();
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
    .doc(data.dish)
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
      container.push(doc.data());
    });
    res.send(container);
  } catch (error) {
    res.send({ error: error.messsage });
  }
};
