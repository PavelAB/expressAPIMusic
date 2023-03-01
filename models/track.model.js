const {Sequelize, ModelStatic, DataTypes}= require("sequelize");


/**
 * 
 * @param {Sequelize} sequelize
 * @returns {ModelStatic<any>} 
 */


module.exports = (sequelize) => {
    const Track = sequelize.define('Track',{
        title:{
            type:DataTypes.STRING(100),
            allowNull:false,
            validate:{
                notNull:true,
                notEmpty:true,
                len:[1,100]
            }
        },
        duration:{
            type:DataTypes.INTEGER,
            allowNull:false,
            validate:{
                notNull:true,
                isInt:true,
                min:1,
                max:604800
            }
        }
    },{
        tableName:'Track',

    })
    return Track;
}