module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        name: DataTypes.STRING,
    }, {
        paranoid:false,
        underscored: true
    });

    return User;
}