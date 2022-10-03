/* eslint-disable no-unused-vars */
const {db, admin} = require('../util/firebase-init');

exports.login = async (req, res) => {
  const data = req.body.data;
  await db.collection('UserDetails').where('userName', '==', data.userName).where('password', '==', data.password);
};

exports.register = async (req, res) => {
  const data = req.body.data;
  await db.collection('UserDetails').add(data, {merge: true});
};

exports.deleteAccount = async (req, res) => {
  const accountId = req.body.accountId;
  await db.collection('UserDetails').doc(accountId).delete();
};

exports.updateAccount = async (req, res) => {
  const data = req.body.data;
  const accountId = req.body.accountId;

  await db.collection('UserDetails').doc(accountId).update(data);
};

exports.getUserAccounts = async (req, res) => {
  try {
    const container = [];
    await db.collection('UserDetails').get().then((val) => {
      val.forEach((doc) =>{
        container.push({...doc.data(), id: doc.id});
        console.log(doc.data());
      });
      res.send(container);
    });
  } catch (error) {
    res.send({error: error.messsage});
  }
};

