const db = require("../models");
const ScoreLvl1 = db.score_level1;
const User = db.user;
const { QueryTypes } = require('sequelize');

exports.postScore = async (req, res, err) => {
    try {
        await ScoreLvl1.create({
            user_id: req.body.user_id,
            score: req.body.score,
            time_survived: req.body.time,
            level: req.body.level
        })

        res.status(200).send("Score created.");
    } catch (err) {
        res.status(500).send({
            message: "Unable to create Score!",
        });
    }
};

exports.userScores = async (req, res, err) => {
    try {
        const scores = await ScoreLvl1.findAll({where: {user_id : req.user_id}, order: [["score", "DESC"], ["time_survived", "DESC"]]})
        res.status(200).send(scores)

    } catch (err) {
        res.status(500).send({
            message: "Unable to find scores!",
        })
    }
}

exports.allScores = async (req, res, err) => {
    try{
        const scores = await db.sequelize.query("SELECT score_id, username, score, level, time_survived, score_date FROM scores_level1 INNER JOIN users ON scores_level1.user_id = users.user_id ORDER BY score desc, time_survived desc;", { type: QueryTypes.SELECT });
        res.status(200).send(scores)
    } catch (err) {
        res.status(500).send({
            message: "Unable to find scores!"
        })
    }
}