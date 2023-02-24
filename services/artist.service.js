const { ArtistDTO } = require('../dto/artist.dto');
const db = require('../models')

const artistService = {
    getAll:async()=>{ 

        const {rows,count} = await db.Artist.findAndCountAll({
            distinct:true,

        });
        
        //Transformation en GenreDTO
        return {
            artists: rows.map(artist=>new ArtistDTO(artist)),
            count 
        }
    
    },

    getById: async (id)=>{
        //const genre = await db.Genre.findOne({id})
        const artist = await db.Artist.findByPk(id);

        return artist? new ArtistDTO(artist) : null;

    },

    create: async (artistToAdd)=>{
        const artist = await db.Artist.create(artistToAdd);
        return artist? new ArtistDTO(artist):null;
    },

    update:async (id, artistToUpdate)=>{
        const updateRow = await db.Artist.update(artistToUpdate,{
            where:{id}
        });
        //updateRow est un tab qui contient 
        //-dans la 1 er case le nombre de ligne affectees
        //-dans la 2 eme case, les lignes affectees
        return updateRow[0] === 1; //Est-ce que nb row affectees =1? si oui update reussi, si non update rate

    },

    delete: async (id)=>{
        const nbDeletedRow=await db.Artist.destroy({
            where:{id}
        })
        return nbDeletedRow === 1; //Est-ce que nb row suppremi =1? si oui delete reussi, si non delete rate
    }
}

module.exports = artistService;