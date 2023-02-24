const { GenreDTO } = require('../dto/genre.dto');
const db = require('../models')

const genreService = {
    getAll:async(offset, limit)=>{
        //Recuperation des genres, tels qu'ils sont en db
        //const genres = await db.Genre.findAll();
        //avec la methode suivant, on obtiendra un object avec les lignes (rows) et le count (toutes les lignes de la table)
        const {rows,count} = await db.Genre.findAndCountAll({
            distinct:true,
            offset:offset, // offset : offset -> offset
            limit:limit

        });
        
        //Transformation en GenreDTO
        return {
            genres: rows.map(genre=>new GenreDTO(genre)),
            count 
        }
    
    },

    getById: async (id)=>{
        //const genre = await db.Genre.findOne({id})
        const genre = await db.Genre.findByPk(id);

        return genre? new GenreDTO(genre) : null;

    },

    create: async (genreToAdd)=>{
        const genre = await db.Genre.create(genreToAdd);
        return genre? new GenreDTO(genre):null;
    },

    update:async (id, genreToUpdate)=>{
        const updateRow = await db.Genre.update(genreToUpdate,{
            where:{id}
        });
        //updateRow est un tab qui contient 
        //-dans la 1 er case le nombre de ligne affectees
        //-dans la 2 eme case, les lignes affectees
        return updateRow[0] === 1; //Est-ce que nb row affectees =1? si oui update reussi, si non update rate

    },

    delete: async (id)=>{
        const nbDeletedRow=await db.Genre.destroy({
            where:{id}
        })
        return nbDeletedRow === 1; //Est-ce que nb row suppremi =1? si oui delete reussi, si non delete rate
    }
}

module.exports = genreService;