const { AlbumDTO } = require('../dto/album.dto');
const db = require('../models')

const albumService = {
    getAll:async()=>{ 

        const {rows,count} = await db.Album.findAndCountAll({
            distinct:true,

        });
        
        //Transformation en GenreDTO
        return {
            albums: rows.map(album=>new AlbumDTO(album)),
            count 
        }
    
    },

    getById: async (id)=>{
        //const genre = await db.Genre.findOne({id})
        const album = await db.Album.findByPk(id);

        return album? new AlbumDTO(album) : null;

    },

    create: async (albumToAdd)=>{
        const album = await db.Album.create(albumToAdd);
        return album? new AlbumDTO(album):null;
    },

    update:async (id, albumToUpdate)=>{
        const updateRow = await db.Album.update(albumToUpdate,{
            where:{id}
        });
        //updateRow est un tab qui contient 
        //-dans la 1 er case le nombre de ligne affectees
        //-dans la 2 eme case, les lignes affectees
        return updateRow[0] === 1; //Est-ce que nb row affectees =1? si oui update reussi, si non update rate

    },

    delete: async (id)=>{
        const nbDeletedRow=await db.Album.destroy({
            where:{id}
        })
        return nbDeletedRow === 1; //Est-ce que nb row suppremi =1? si oui delete reussi, si non delete rate
    }
}

module.exports = albumService;