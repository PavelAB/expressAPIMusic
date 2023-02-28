const { TrackDTO } = require('../dto/track.dto');
const { Genre, Album, Artist } = require('../models');
const db = require('../models')

const trackService = {
    getAll:async(offset,limit)=>{ 

        const {rows,count} = await db.Track.findAndCountAll({
            distinct:true,
            offset,
            limit,
            //rajout genre
            include : [Genre,Album,Artist]

            //rajout abums
            //rajout artists

        });
        
        //Transformation en GenreDTO
        return {
            tracks: rows.map(track=>new TrackDTO(track)),
            count 
        }
    
    },

    getById: async (id)=>{
        //const genre = await db.Genre.findOne({id})
        const track = await db.Track.findByPk(id,{
            include : [Genre, Album,Artist]

        });

        return track? new TrackDTO(track) : null;

    },

    create: async (trackToAdd)=>{

        //Ajout de la transaction 
        const transaction = await db.sequelize.transaction()

        let track;
        try {
            
        

                track = await db.Track.create(trackToAdd,{transaction});

                //ajouter lien album
                await track.addAlbum(trackToAdd.albums,{transaction})

                //ajouter liens artists
                //Pour chacun des artists recus
                for ( const artist of trackToAdd.artists ){
                    await track.addArtist(artist.id,{throught : {feat:artist.feat},transaction})
                }
                //await track.addArtist(trackToAdd.artists,{transaction})


                // //
                // //
                // Album.addTrack()
                // Artist.addTrack()
                // //
                // // ->
                // Track.addAlbum
                // // ->
                // Track.addArtist

                //Validationdes modification en DB
                await transaction.commit();

                //Recuperer en db la track avec artists et album
                const addedTrack = await db.Track.findByPk(track.id,{
                    include : [Genre, Album,Artist]
                });



                return addedTrack? new TrackDTO(addedTrack):null;
        } 
    catch (error) {
        //Retour a l'etat initial
        await transaction.rollback();
        return null;
            
    }
    },

    update:async (id, trackToUpdate)=>{
        const updateRow = await db.Track.update(trackToUpdate,{
            where:{id}
        });
        //updateRow est un tab qui contient 
        //-dans la 1 er case le nombre de ligne affectees
        //-dans la 2 eme case, les lignes affectees
        return updateRow[0] === 1; //Est-ce que nb row affectees =1? si oui update reussi, si non update rate

    },

    delete: async (id)=>{
        const nbDeletedRow=await db.Track.destroy({
            where:{id}
        })
        return nbDeletedRow === 1; //Est-ce que nb row suppremi =1? si oui delete reussi, si non delete rate
    }
}

module.exports = trackService;