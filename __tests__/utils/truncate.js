const { sequelize } = require('../../src/app/models');



module.exports = () => {
    Object.keys(sequelize.models).map(key => {
        return sequelize.models[key].destroy({
            force: true,
            truncate: true,
            cascade: true,
            restartIdentity: true,
        });
    });
}