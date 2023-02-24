class ArtistDTO{
    constructor({id, firstname,lastname, birthdate,deathdate}){
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname ?? null;
        this.birthdate = birthdate ?? null;
        this.deathdate = deathdate ?? null;
    }
}





module.exports={ArtistDTO}