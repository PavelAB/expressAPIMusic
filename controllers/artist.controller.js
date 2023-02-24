const {Request,Response}=require('express');
const artistService = require('../services/artist.service');
const { SuccessArrayResponse, SuccesResponse } = require('../utils/success.response');


const artistController ={
    /**
     * Get All
     * @param {Request} req 
     * @param {Response} res 
     */
    getAll : async (req,res) => {
        const {offset,limit}=req.pagination;
        const {artists,count} = await artistService.getAll(offset,limit);
        res.status(200).json(new SuccessArrayResponse(artists,count));
    },
    /**
     * Get All
     * @param {Request} req 
     * @param {Response} res 
     */

    getById : async (req,res)=>{
        const {id} = req.params;
        const artist = await artistService.getById(id);
        if(!artist){
            res.sendStatus(404);
            return;
        }
        res.status(200).json(new SuccesResponse(artist));

    },
    /**
    * Get All
    * @param {Request} req 
    * @param {Response} res 
    */
    create : async (req,res)=>{
        const data = req.body;
        const artist = await artistService.create(data);
        res.location('/atist/'+artist.id);
        res.status(201).json(new SuccesResponse(artist,201))
    },
    /**
     * Get All
     * @param {Request} req 
     * @param {Response} res 
     */
    update : async (req,res)=>{
        const {id} = req.params;
        const data = req.body;
        const updated = await artistService.update(id, data);
        if(!updated){
            res.sendStatus(404);
            return;
        }
        res.sendStatus(204);
        
    },
    /**
     * Get All
     * @param {Request} req 
     * @param {Response} res 
     */ 
    delete : async (req,res)=>{
        const {id}=req.params;
        const deleted = await artistService.delete(id);
        if(!deleted){
            res.sendStatus(404);
            return;
        }
        res.sendStatus(204);
    }
}

module.exports = artistController;