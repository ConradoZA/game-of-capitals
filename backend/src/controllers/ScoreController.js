const Score = require("../models/Score");
const { Op } = require("sequelize");

const ScoreController = {
  async getAll(req, res) {
    try {
      const allScores = await Score.findAll({});
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
          ],
        },
      });
      res.send(myScore);
    } catch (error) {
      console.error(error);
      res.status(400).send({ msg: error.message });
    }
  },

  async newScore(req, res) {
    try {
      if (
        typeof req.body.score !== "number" ||
        typeof req.body.name !== "string" ||
        typeof req.body.continent !== "number"
      )
        res.status(400).send({ msg: "DataType error" });
      const newScore = {
        score: req.body.score,
        username: req.body.name,
        continent: req.body.continent,
      };
      const alreadyExists = await Score.findOne({
        where: {
          [Op.and]: [
            {
              username: req.body.name,
            },
            {
              continent: req.body.continent,
            },
          ],
        },
      });
      if (alreadyExists)
        res.status(409).send("This name already exists in this game continent");
      const newEntry = await Score.create(newScore);
      res.status(201).send(newEntry);
    } catch (error) {
      console.error(error);
      res.status(400).send({ msg: error.message });
    }
  },

  async updateHighScore(req, res) {
    try {
      const alreadyExists = await Score.findOne({
        where: {
          [Op.and]: [
            {
              username: req.params.player,
            },
            {
              continent: req.params.continent,
            },
          ],
        },
      });

      if (typeof req.body.score !== "number")
        res.status(400).send({ msg: "Not a number" });

      if (alreadyExists.dataValues.score >= req.body.score)
        res.status(409).send("The score isn't greater than the one registered");

      await alreadyExists.update({ score: req.body.score });
      res.status(204).send("updated");
    } catch (error) {
      console.error(error);
      res.status(400).send({ msg: error.message });
    }
  },

  async delete(req, res) {
    try {
      if (req.headers.secret !== "428csuz~_y!xtKu")
        res
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
