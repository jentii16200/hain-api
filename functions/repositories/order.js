const { db, admin } = require("../util/firebase-init");
const { calTotalPrice } = require("../util/calculate-order");
//  Order-Model = {
//         orderId: "",
//         status: "",
// userDetails: {
//         name: "",
//         allergy: [] ,
//         userId: ""
// }
//         orders: [
//             {
//                 dish: "",
//                 quantity:"",
//                 price: 0
//             }
//         ],

exports.getOrderUser = async (req, res) => {
  const id = req.body.id;
  try {
    const container = [];

    const order = await db
      .collection("Order")
      .where("userDetails.id", "==", id)
      .get();

    order.forEach((doc) => {
      let obj = {};
      obj = { ...doc.data() };

      container.push(obj);
    });
    res.send({ result: container, status: 200, message: "success" });
  } catch (error) {
    res.send({ message: error.messsage, result: "fail" });
  }
};

exports.addOrder = async (req, res) => {
  const data = req.body.data;
  // data.orderId = makeid(10);
  // TODO FOR TOTAL PRICCE
  data.totalPrice = calTotalPrice(data.order);
  data.timestamp = new Date();
  const userDetailsRef = await db
    .collection("UserDetails")
    .doc(data.userDetails.id)
    .get();
  const userDetailsDoc = userDetailsRef.data();

  const message = {
    token: userDetailsDoc.fcmToken,
    notification: {
      title: `Hain`,
      body: `Your Order now is on process`,
    },
  };
  admin
    .messaging()
    .send(message)
    .then((response) => {})
    .catch((error) => {
      console.log("Error Sending Single Notification", JSON.stringify(error));
    });
  await db
    .collection("Order")
    .add(data)
    .then((val) => {
      res.send({ result: "success", status: 200 });
    });
};

exports.rejectOrder = async (req, res) => {
  const id = req.body.id;
  sendMessage(id, "rejected");
  await db.collection("Order").doc(id).set(
    {
      status: "rejected",
    },
    { merge: true }
  );
};

exports.acceptOrder = async (req, res) => {
  const id = req.body.id;
  sendMessage(id, "on process");
  await db.collection("Order").doc(id).set(
    {
      status: "onProcess",
    },
    { merge: true }
  );
};
exports.onGoingOrder = async (req, res) => {
  const id = req.body.id;
  sendMessage(id, "to server");
  await db.collection("Order").doc(id).set(
    {
      status: "toServer",
    },
    { merge: true }
  );
};

exports.doneOrder = async (req, res) => {
  const id = req.body.id;
  sendMessage(id, "completed");
  await db.collection("Order").doc(id).set(
    {
      status: "completed",
    },
    { merge: true }
  );
};

exports.getOrderLogs = async (req, res) => {
  try {
    const container = [];
    await db
      .collection("Order")
      .get()
      .then((val) => {
        val.forEach((doc) => {
          container.push({
            ...doc.data(),
            id: doc.id,
            timestamp: new Date(),
          });
        });
        res.send(container);
      });
  } catch (error) {
    res.send({ error: error.message });
  }
};
exports.newOrderStatus = async (req, res) => {
  try {
    const userId = req.body.userId;
    const orderId = req.body.orderId;
    const status = req.body.status;
    console.log(userId);
    console.log(orderId);
    console.log(status);
    const userDetailsRef = await db.collection("UserDetails").doc(userId).get();
    const userDetailsDoc = userDetailsRef.data();
    await db.collection("Order").doc(orderId).set(
      {
        status: status,
      },
      { merge: true }
    );

    const message = {
      token: userDetailsDoc.fcmToken,
      notification: {
        title: `Hain`,
        body: `Your Order now is ${status}`,
      },
    };
    admin
      .messaging()
      .send(message)
      .then((response) => {})
      .catch((error) => {
        console.log("Error Sending Single Notification", JSON.stringify(error));
      });
    res.send({ status: 200, message: "Success" });
  } catch (error) {
    res.send({ status: 400, message: error.message });
  }
  return;
};
const makeid = (length) => {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
};
