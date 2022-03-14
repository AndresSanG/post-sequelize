const {DataTypes} = require('sequelize');
const {sequelize} = require('../util/database');


const User = sequelize.define('user',{
    id:{
        primaryKey:true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    email:{
        type: DataTypes.STRING(100),
        unique: true,
        allowNull: false,
    },
    password:{
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING(10),
        allowNull: false,
        defaultValue: 'active',
    },
});

module.exports = {User};