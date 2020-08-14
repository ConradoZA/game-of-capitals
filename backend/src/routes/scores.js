const router = require("express").Router();
const ScoreController = require("../controllers/ScoreController");

router
  .route("/:continent/:diff")
  .get(ScoreController.getAll)
  .post(ScoreController.newScore);

router
  .route("/:continent/:diff/:player")
  .put(ScoreController.updateHighScore)
  .get(ScoreController.getOne);

router
  .route("/:id")
  .delete(ScoreController.delete);

module.exports = router;
