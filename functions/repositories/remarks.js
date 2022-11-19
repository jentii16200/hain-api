const { db } = require('../util/firebase-init');

// TODO
// deleteRemarks

exports.createRemarks = async (req, res) => {
  const message = req.body.message;

  await db.collection('Remarks').add(message);
};

exports.getRemarks = async (req, res) => {
  const remarksRef = await db.collection('Remarks').get();
  const remarksDoc = remarksRef.data();

  return remarksDoc;
};
