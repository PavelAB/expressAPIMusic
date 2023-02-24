const {Request,Response,NextFunction}=require('express')


/**
 * Fonction middleware Pagination
 * @param {{ defaultLimit: number?, maxLimit :number?}? } options 
 * @returns {(req: Request,res:Response ,next:NextFunction) => undefined }
 */

const pagination = (options) => {
    //Recup des options fournis lors de l'utilisation du middleware dans la route
    // si on a des options et si on a la prop defaultLimit qui a ete fornie,on prend la valeur qui est dedans sinon on met 20
    const defaultLimit = options?.defaultLimit ?? 20;
    const maxLimit = options?.maxLimit ?? 50;


    /**
     * Middleware Pagination
     * @param {Requst} req
     * @param {Response} res
     * @param {NextFunction} next
     * 
     */
    return (req,res,next)=>{
        //Recuperation des donnees eventuelements fournies dsn la query de la requete
        const reqOffset = parseInt(req.query.offset);
        const reqLimit = parseInt(req.query.limit);
        //Verification des valeurs de la requete et definitions des vrais offset et limit
        //si l'offset n'a pas ete fourni dans la requete si il est mal ecrit (lettre) ou si c'est plus petit que 0, on mettrea offset a 0par defaut, sinon on met la valeurde la query
        const offset = (isNaN(reqOffset) || reqOffset < 0 ) ? 0 :reqOffset 
        //si la limit n'a pas ete fornie dans la requete ou si mal ecrit ou plus petit que 0,on mettre la valeur par defaut precalculee
        //sinon on met la valeur le plus petite entre la limite fournie et la query et la limite max precalcule
        const limit = (isNaN(reqLimit)|| reqLimit <= 0 ) ? defaultLimit : Math.min(reqLimit,maxLimit); 
        //on cree sur l'objet req (la requete ) une nouvel pagination qui va contenir offset et limit 
        req.pagination = { offset, limit }
        //Appel de la fonction next() pour contenir la requete
        next();
    }
}
module.exports= pagination;