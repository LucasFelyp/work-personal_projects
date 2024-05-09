const { sequelize, DataTypes } = require("sequelize");
const conecttion = require("./database");

const User = conecttion.define("User",{
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false,
    }
});

const Register = conecttion.define("Register", {
    name:{
        type: DataTypes.STRING,
        allowNull:false
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        },
    },
    date:{
        type: DataTypes.DATE,
        allowNull: false
    },
    nickname:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false
    }

});


Register.sync({force: false}).then(()=>{});

User.sync({force: false}).then(() =>{});

module.exports = {User, Register}


