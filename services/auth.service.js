const argon2=require('argon2');
const { UserDTO } = require('../dto/user.dto');
const db = require('../models')


// Deux facon faire :Un service User + un service Auth (Authentification)
//Ou un seul service UserService et deux controllers
const authService={

    
    register :async (userToAdd)=>{
        //Hashage du password
        const hashPwd = await argon2.hash(userToAdd.password);
        //Remplacement du passwor surle userToAdd
        userToAdd.password=hashPwd;
        //Ajout en db
        const user = await db.User.create(userToAdd);
        //Renvoie de user se cree ou null
        return user? new UserDTO(user) : null;
    },
    login :async (email,password)=>{
        //Recuperer l'utilisateur qui possede cet email
        const user = await db.User.findOne({
            where : {email}
        });

        //Si pas d'utilisateur -> 404
        if(!user){
            return null;
        }
        //Si utilisateur :
        //Verifie que le password entre = password hashe
        const isValid = await argon2.verify(user.password,password); // on compare le password en db (hashe) au password entre pour se connecter
        // si le deux concordent argon renvoie true si non false
        //Si verif pas ok -> return null
        if(!isValid){
            return null;
        }
        //Si verif ok -> renvoie le user
        return new UserDTO(user);
    },
}
module.exports=authService;