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
