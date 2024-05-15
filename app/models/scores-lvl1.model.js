const User = require("../models/user.model")

module.exports = (sequelize, Sequelize) => {
    const ScoreLvl1 = sequelize.define("score_level1", {
      score_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      user_id: {
        type: Sequelize.INTEGER,

        refences:{
            model: User,
            key: User.user_id
        }
      },
      score: {
        type: Sequelize.INTEGER
      },
      level: {
        type: Sequelize.INTEGER
      },
      time_survived: {
        type: Sequelize.TIME
      },
      score_date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      }
    }, {
        timestamps: false,
        tableName: "scores_level1"
    });
  
    return ScoreLvl1;
  };