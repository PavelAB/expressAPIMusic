const {Sequelize, ModelStatic, DataTypes}= require("sequelize");


/**
 * 
 * @param {Sequelize} sequelize
 * @returns {ModelStatic<any>} 
 */


module.exports = (sequelize) => {
    const Genre = sequelize.define('Genre',{
        name :{
            type:DataTypes.STRING(50),
            unique: 'UK_Genre_Name',
            validate:{
                isAlpha:true,
                len:[1,50],
                notEmpty:true
            }
        }
    },{
        tableName:'Genre',
        timestamps: false,

    })
    return Genre;
}