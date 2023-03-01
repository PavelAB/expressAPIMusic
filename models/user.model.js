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
            allowNull:false,
            validate:{
                isAlpha:true,
                notNull:true,
                notEmpty:true

            }
        },
        lastname:{
            type:DataTypes.STRING(100),
            allowNull:false,
            validate:{
                isAlpha:true,
                notNull:true,
                notEmpty:true
            }
        },
        email:{
            type:DataTypes.STRING(100),
            allowNull:false,
            unique : "UK_User_Email",
            validate:{
                isEmail:true,
                notNull:true,
                notEmpty:true
            }
        },
        password:{
            type:DataTypes.STRING(100),
            allowNull:false
        },
        role:{
            type:DataTypes.STRING,
            allowNull:false,
            defaultValue: "User",
            validate:{
                notNull:true,
                notEmpty:true,
                isIn:[['user','admin']]
            }
        }
    },{
        tableName:'User',

    })
    return User;
}