const { Request, Response } = require('express');
const userService = require('../services/user.service');
const { SuccessArrayResponse, SuccesResponse } = require('../utils/success.response');


const userController = {
    /**
     * Get All
     * @param {Request} req 
     * @param {Response} res 
     */
    getAll: async (req, res) => {
        //res.sendStatus(501);


        //SANS middleware
        const offset = req.query.offset || 0;
        const limit = req.query.limit || 50;

        // //AVEC middleware
        // //On recupere les props offset et limit dans pagination ajoute a la requete par notre middleware
        // const {offset,limit}=req.pagination;
        

        const { users, count } = await userService.getAll(offset,limit);
        res.status(200).json(new SuccessArrayResponse(users, count));
    },
    /**
     * Get All
     * @param {Request} req 
     * @param {Response} res 
     */

    getById: async (req, res) => {
        const { id } = req.params;

        const user = await userService.getById(id);
        if (!user) {
            res.sendStatus(404);
            return
        }
        res.status(200).json(new SuccesResponse(user));
    },
    /**
    * Get All
    * @param {Request} req 
    * @param {Response} res 
    */
    create: async (req, res) => {
        const data = req.body;

        const user = await userService.create(data)

        res.location('/user/' + user.id);
        res.status(201).json(new SuccesResponse(user, 201))
    },
    /**
     * Get All
     * @param {Request} req 
     * @param {Response} res 
     */
    update: async (req, res) => {
        const { id } = req.params;
        const data = req.body;

        const isUpdated = await userService.update(id, data);
        if (!isUpdated) {
            res.sendStatus(404)
            return;
        }
        res.sendStatus(204);

    },
    /**
     * Get All
     * @param {Request} req 
     * @param {Response} res 
     */
    delete: async (req, res) => {
        const { id } = req.params;

        const isDelete = await userService.delete(id)
        if (!isDelete) {
            res.sendStatus(404);
            return;
        }
        res.sendStatus(204);
    }
}

module.exports = userController;