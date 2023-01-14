const { db } = require("../../util/firebase-init");
exports.updateLikesRepo = async (id, menuId) => {
  const likesResult = await getAllLikes(id);
  const likesArray = likesResult.likesArray;

  const isExistData = isExistsArray(likesArray, menuId);
  console.log(isExistData);

  if (isExistData != 0) {
    const res = filterArray(likesArray, menuId);

    saveLike(id, res);
    return;
  }
  likesArray.push(menuId);
  saveLike(id, likesArray);
  return;
};

const saveLike = async (id, array) => {
  await db
    .collection("UserDetails")
    .doc(id)
    .collection("Likes")
    .doc("result")
    .set({ likesArray: array });
};

const getAllLikes = async (id) => {
  try {
    const likeRef = await db
      .collection("UserDetails")
      .doc(id)
      .collection("Likes")
      .doc("result")
      .get();
    const likesDoc = likeRef.data();

    return likesDoc;
  } catch (error) {
    console.log("error get all likes repo function", error.message);
  }
};

exports.getAllLikesRepo = async (id) => {
  const result = await getAllLikes(id);
  return result;
};

const isExistsArray = (arr, value) => {
  if (!Array.isArray(value)) {
    const result = arr.filter((val) => val == value);
    console.log(result);
    return result.length;
  }

  const arr1 = arr;
  const arr2 = value;
  const res = arr1.filter((item) => arr2.includes(item));

  return res.length;
};
const filterArray = (arr, value) => {
  if (!Array.isArray(value)) {
    const result = arr.filter((val) => val != value);

    return result;
  }
  const arr1 = arr;
  const arr2 = value;
  const res = arr1.filter((item) => !arr2.includes(item));

  return res;
};

exports.getAllLikesMenuRepo = async (id) => {
  const result = await getAllLikes(id);
  const container = [];
  for (let i = 0; i < result.likesArray.length; i++) {
    const specificMenuResult = await getSpecificMenu(result.likesArray[i]);
    container.push(specificMenuResult);
  }
  return container;
};

const getSpecificMenu = async (foodId) => {
  const foodMenuRef = await db.collection("Menu").doc(foodId).get();
  const foodMenuDoc = foodMenuRef.data();
  return foodMenuDoc;
};
