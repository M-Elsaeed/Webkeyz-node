const Sequelize = require("sequelize");
const sequelize = new Sequelize('mysql://root:J3oss@localhost:3306/ameen');
DB = {
    User: sequelize.import('./user.js'),
}
DB.sequelize = sequelize;
DB.Sequelize = Sequelize;
module.exports = DB;