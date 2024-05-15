const config = require("../config/db.config.js");
require('dotenv').config()


const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    config.DB,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: config.HOST,
        dialect: config.dialect,
        pool: {
            max: config.pool.max,
            min: config.pool.min,
            acquire: config.pool.acquire,
            idle: config.pool.idle
        }
    }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.score_level1 = require("../models/scores-lvl1.model.js")(sequelize, Sequelize);

db.user.belongsToMany(db.role, {
    through: "user_roles",
    foreignKey: "user_id",
    timestamps: false
});

db.role.belongsToMany(db.user, {
    through: "user_roles",
    foreignKey: "role_id",
    timestamps: false
});

db.user.hasMany(db.score_level1,{
    foreignKey: "user_id"
});

db.ROLES = ["user", "admin"];

module.exports = db;