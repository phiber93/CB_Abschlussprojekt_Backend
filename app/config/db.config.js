module.exports = {
    HOST: "localhost",
    DB: "game_db",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};