module.exports = (sequelize, DataTypes) => {
    const users = sequelize.define("users", {
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        birthday: {
            type: DataTypes.DATE,
            allowNull: true
        },
        interests: {
            type: DataTypes.JSON,
            allowNull: true
        }
    });
    return users;
}