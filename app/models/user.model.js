module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
        user_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        user_password: {
            type: Sequelize.STRING
        },
        created_at: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
        },
        is_verified: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        verification_token:{
            type: Sequelize.STRING
        }
    }, {
        timestamps: false
    });

    return User;
};