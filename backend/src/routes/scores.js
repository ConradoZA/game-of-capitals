const router = require("express").Router();
const ScoreController = require("../controllers/ScoreController");

router
  .route("/")
  .get(ScoreController.getAll)
  .post(ScoreController.newScore);

router
  .route("/:continent/:player")
  .put(ScoreController.updateHighScore)
  .get(ScoreController.getOne);

router
  .route("/:id")
  .delete(ScoreController.delete);

module.exports = router;
