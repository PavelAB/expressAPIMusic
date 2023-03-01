const {Sequelize, ModelStatic, DataTypes}= require("sequelize");


/**
 * 
 * @param {Sequelize} sequelize
 * @returns {ModelStatic<any>} 
 */


module.exports = (sequelize) => {
    const Artist = sequelize.define('Artist',{
        firstname:{
            type:DataTypes.STRING(100),
            allowNull:false,
            validate:{
                notNull:true,
                notEmpty:true,
                isAlpha:true,
                len :[1,100]
            }
           
        },
        lastname:{
            type:DataTypes.STRING(50),
            allowNull:true,
            validate:{
                notEmpty:true,
                isAlpha:true
            }
        },
        birthdate:{
            type:DataTypes.DATE,
            allowNull:true,
            validate:{
                isDate:true
            }
        },
        deathdate:{
            type:DataTypes.DATE,
            allowNull:true,
            validate:{
                isDate:true,
                customValidator(){
                    if(this.birthdate>this.deathdate)
                    {
                        throw new Error('Date de naissance doit etre plus petite que la date de mort')
                    }
                }
            }
        }
    },{
        tableName:'Artist',

    })
    return Artist;
}