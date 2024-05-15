const controller = require("../controllers/score-lvl1.controller");
const { authJwt } = require("../middleware");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/api/scores/level1/postScore", controller.postScore);

    app.get("/api/scores/level1/getUserScores", [authJwt.verifyToken], controller.userScores);

    app.get("/api/scores/level1/getAllScores", controller.allScores);
}