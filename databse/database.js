const Sequelize = require("sequelize");

const conecttion =  new Sequelize("Game","root", "85213",{
    host:  "localhost",
    dialect: "mysql"
});

module.exports = conecttion