const {db} = require('../util/firebase-init');
const {calTotalPrice} = require('../util/calculate-order');
//  Order-Model = {
//         orderId: "",
//         status: "",
//         name: "",
//         orders: [
//             {
//                 dish: "",
//                 quantity:"",
//                 price: 0
//             }
//         ],
//         allergy: [] ,
//         userId: ""
//  }


exports.addOrder = async (req, res) =>{
  const data = req.body.data;
  data.total = calTotalPrice(data);
  await db.collection('Order').add(data);
};

exports.rejectOrder = async (req, res) => {
  const id = req.body.id;
  await db.collection('Order').doc(id).set({
    status: 'rejected',
  }, {merge: true});
};

exports.acceptOrder = async (req, res) => {
  const id = req.body.id;
  await db.collection('Order').doc(id).set({
    status: 'onProcess',
  }, {merge: true});
};
exports.onGoingOrder = async (req, res) => {
  const id = req.body.id;
  await db.collection('Order').doc(id).set({
    status: 'toServer',
  }, {merge: true});
};

exports.doneOrder = async (req, res) => {
  const id = req.body.id;
  await db.collection('Order').doc(id).set({
    status: 'completed',
  }, {merge: true});
};

exports.getOrderLogs = async (req, res) => {
  try {
    const container = [];
    await db.collection('Order').get().then((val) => {
      val.forEach((doc)=>{
        container.push({...doc.data(), id: doc.id});
      });
      res.send(container);
    });
  } catch (error) {
    res.send({error: error.message});
  }
};
