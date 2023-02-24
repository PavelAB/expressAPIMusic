const { UserDTO } = require('../dto/user.dto');
const db = require('../models')

const userService = {
    getAll:async(offset, limit)=>{
        const {rows,count} = await db.User.findAndCountAll({
            distinct:true,
            offset:offset,
            limit:limit

        });
        
        return {
            users: rows.map(user=>new UserDTO(user)),
            count 
        }
    
    },

    getById: async (id)=>{
        const user = await db.User.findByPk(id);

        return user? new UserDTO(user) : null;

    },

    create: async (userToAdd)=>{
        const user = await db.User.create(userToAdd);
        return user? new UserDTO(user):null;
    },

    update:async (id, userToUpdate)=>{
        const updateRow = await db.User.update(userToUpdate,{
            where:{id}
        });
        return updateRow[0] === 1;

    },

    delete: async (id)=>{
        const nbDeletedRow=await db.User.destroy({
            where:{id}
        })
        return nbDeletedRow === 1;
    }
}

module.exports = userService;