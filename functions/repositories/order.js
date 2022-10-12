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
  await db.collection('OrderHistory').add(data);
};

exports.rejectOrder = async (req, res) => {
  const id = req.body.id;
  await db.collection('OrderHistory').doc(id).set({
    status: 'rejected',
  }, {merge: true});
};

exports.acceptOrder = async (req, res) => {
  const id = req.body.id;
  await db.collection('OrderHistory').doc(id).set({
    status: 'onProcess',
  }, {merge: true});
};
exports.onGoingOrder = async (req, res) => {
  const id = req.body.id;
  await db.collection('OrderHistory').doc(id).set({
    status: 'onGoing',
  }, {merge: true});
};

exports.doneOrder = async (req, res) => {
  const id = req.body.id;
  await db.collection('OrderHistory').doc(id).set({
    status: 'completed',
  }, {merge: true});
};

exports.getOrderLogs = async (req, res) => {
  try {
    const orderHistoryRef = await db.collection('OrderHistory').get();
    const orderHistoryDoc = orderHistoryRef.data();
    res.send({...orderHistoryDoc});
  } catch (error) {
    res.send({error: error.message});
  }
};
