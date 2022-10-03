const {db} = require('../util/firebase-init');
//  Menu Management
//  Model = {
//      image: url
//      dish:
//      price:
//      ingredients: []
//  }


exports.addMenu = async (req, res) => {
  const data = req.body.data;
  await db.collection('Menu').add(data);
};

exports.deleteMenu = async (req, res) => {
  const idMenu = req.body.idMenu;
  await db.collection('Menu').add(idMenu);
};

exports.getMenu = async (req, res) => {
  try {
    const container = [];
    const type = req.body.type;
    const menu = await db.collection('Menu').where('type', '==', type).get();
    menu.forEach((doc) => {
      container.push(doc.data());
    });
    res.send(container);
  } catch (error) {
    res.send({error: error.messsage});
  }
};
