const {Sequelize, ModelStatic, DataTypes}= require("sequelize");


/**
 * 
 * @param {Sequelize} sequelize
 * @returns {ModelStatic<any>} 
 */
module.exports = (sequelize) => {
    const User = sequelize.define('User',{
        firstname:{
            type:DataTypes.STRING(100),
            allowNull:false
        },
        lastname:{
            type:DataTypes.STRING(100),
            allowNull:false
        },
        email:{
            type:DataTypes.STRING(100),
            allowNull:false
        },
        password:{
            type:DataTypes.STRING(100),
            allowNull:false
        },
    },{
        tableName:'User',

    })
    return User;
}