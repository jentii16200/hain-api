const {
  updateLikesRepo,
  getAllLikesRepo,
  getAllLikesMenuRepo,
} = require("./controllers/like-controller");
exports.updateLikesController = async (req, res) => {
  const id = req.body.id;
  const menuId = req.body.menuId;
  await updateLikesRepo(id, menuId);
  res.send({
    result: "sucess",
    message: "successfully update like",
    status: 200,
  });
};

exports.getAllLikesController = async (req, res) => {
  const id = req.body.id;

  const likesData = await getAllLikesRepo(id);
  res.send({
    result: likesData,
    message: "successfully sold out menu",
    status: 200,
  });
};

exports.getAllSpecificLikesMenuController = async (req, res) => {
  const id = req.body.id;
  const result = await getAllLikesMenuRepo(id);
  console.log(result);
  res.send({
    result: result,
    message: "successfully get all likes",
    status: 200,
  });
};
