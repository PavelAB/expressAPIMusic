const {Sequelize, ModelStatic, DataTypes}= require("sequelize");


/**
 * 
 * @param {Sequelize} sequelize
 * @returns {ModelStatic<any>} 
 */


module.exports = (sequelize) => {
    const Album = sequelize.define('Album',{
        title : {
            type:DataTypes.STRING(50),
            allowNull:false,
            validate:{
                notNull: true,
                notEmpty: true,
                notContains : '/'
            }
        },
        cover:{
            type:DataTypes.STRING,
            allowNull:true,
            validate : {
                notEmpty : true,
                
                // // is : /^(\/[^\/]+){0,2}\/?$/
                // customValidator:()=>{
                //     if(!values.includes(this.title)){
                //         throw new Error('Le titre doit etre contenu dans le nom de la photo')
                //     }
                // }
            }
        }
    },{
        tableName:'Album',

    })
    return Album;
}