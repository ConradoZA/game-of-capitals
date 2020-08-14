const Score = require("../models/Score");
const { Op } = require("sequelize");

const ScoreController = {
  async getAll(req, res) {
    try {
      const allScores = await Score.findAll({
        where: {
          [Op.and]: [
            {
              continent: req.params.continent,
            },
            {
              difficulty: req.params.diff,
            },
          ],
        },
      });
      res.send(allScores);
    } catch (error) {
      console.error(error);
      res.status(400).send({ msg: error.message });
    }
  },

  async getOne(req, res) {
    try {
      const myScore = await Score.findOne({
        where: {
          [Op.and]: [
            {
              username: req.params.player,
            },
            {
              continent: req.params.continent,
            },
            {
              difficulty: req.params.diff,
            },
          ],
        },
      });
      if (myScore) {
        res.send(myScore);
      } else {
        res.send({ msg: "not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(400).send({ msg: error.message });
    }
  },

  async newScore(req, res) {
    try {
      if (
        typeof req.body.score !== "number" ||
        typeof req.body.name !== "string"
      )
        return res.status(400).send({ msg: "DataType error" });
      const newScore = {
        score: req.body.score,
        username: req.body.name,
        continent: req.params.continent,
        difficulty: req.params.diff,
      };
      const alreadyExists = await Score.findOne({
        where: {
          [Op.and]: [
            {
              username: req.body.name,
            },
            {
              continent: req.params.continent,
            },
            {
              difficulty: req.params.diff,
            },
          ],
        },
      });
      if (alreadyExists)
        return res
          .status(409)
          .send("This name already exists in this game continent");
      const newEntry = await Score.create(newScore);
      res.status(201).send(newEntry);
    } catch (error) {
      console.error(error);
      res.status(400).send({ msg: error.message });
    }
  },

  async updateHighScore(req, res) {
    try {
      const oldInput = await Score.findOne({
        where: {
          [Op.and]: [
            {
              username: req.params.player,
            },
            {
              continent: req.params.continent,
            },
            {
              difficulty: req.params.diff,
            },
          ],
        },
      });

      if (typeof req.body.score !== "number")
        return res.status(400).send({ msg: "Not a number" });

      if (oldInput.dataValues.score >= req.body.score)
        return res.status(409).send("The score isn't greater than the one registered");

      await oldInput.update({ score: req.body.score });
      res.status(204).send("updated");
    } catch (error) {
      console.error(error);
      res.status(400).send({ msg: error.message });
    }
  },

  async delete(req, res) {
    try {
      if (req.headers.secret !== "428csuz~_y!xtKu")
        return res
          .status(400)
          .send({ msg: "Ah,ah,ahhh... You didn't say the magic word." });
      await Score.destroy({
        where: { id: req.params.id },
      });
      res.status(204).send("deleted");
    } catch (error) {
      console.error(error);
      res.status(400).send({ msg: error.message });
    }
  },
};
module.exports = ScoreController;
