const { Request, Response } = require('express');
const genreService = require('../services/genre.service');
const { SuccessArrayResponse, SuccesResponse } = require('../utils/success.response');


const genreController = {
    /**
     * Get All
     * @param {Request} req 
     * @param {Response} res 
     */
    getAll: async (req, res) => {
        //res.sendStatus(501);


        //AVANT middleware
        // //Recuperation dans le query, des props limit et offset
        // //console.log(req.query);
        // const offset = req.query.offset || 0; // si offset n'a pas ete fourni, si c'est ne chaine vide , si c'esu null on prend la valeur 0 sinon on prend la valeur offset
        // const limit = req.query.limit || 50;

        //AVEC middleware
        //On recupere les props offset et limit dans pagination ajoute a la requete par notre middleware
        const {offset,limit}=req.pagination;
        

        //on fournit mnt offse et limit a notre getAll pour qu'il puisse les utiliser dans la requete
        const { genres, count } = await genreService.getAll(offset,limit);
        res.status(200).json(new SuccessArrayResponse(genres, count));
    },
    /**
     * Get All
     * @param {Request} req 
     * @param {Response} res 
     */

    getById: async (req, res) => {
        //res.sendStatus(501);
        const { id } = req.params;

        const genre = await genreService.getById(id);
        if (!genre) {
            //si pas de genre recupere erreur 404
            res.sendStatus(404);
            return
        }
        //Si on a recup un genre
        res.status(200).json(new SuccesResponse(genre));
    },
    /**
    * Get All
    * @param {Request} req 
    * @param {Response} res 
    */
    create: async (req, res) => {
        //res.sendStatus(501);



        //Recuperation des donnes du genre qu'on veut creer
        const data = req.body;


        const genre = await genreService.create(data)

        //on va aller modifier la response; pour ajouter le lien vers la requete sur le genre qui vient d'etre cree (getById)
        res.location('/genre/' + genre.id);
        //201 Created
        res.status(201).json(new SuccesResponse(genre, 201))
    },
    /**
     * Get All
     * @param {Request} req 
     * @param {Response} res 
     */
    update: async (req, res) => {
        //res.sendStatus(501);
        //recup ID
        const { id } = req.params;

        const data = req.body;

        //Recuperation du body
        const isUpdated = await genreService.update(id, data);
        if (!isUpdated) {
            res.sendStatus(404)
            return;
        }
        //204 No content
        res.sendStatus(204);

    },
    /**
     * Get All
     * @param {Request} req 
     * @param {Response} res 
     */
    delete: async (req, res) => {
        //res.sendStatus(501);
        const { id } = req.params;

        const isDelete = await genreService.delete(id)
        if (!isDelete) {
            res.sendStatus(404);
            return;
        }
        res.sendStatus(204);
    }
}

module.exports = genreController;