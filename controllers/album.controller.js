const {Request,Response}=require('express');
const albumService = require('../services/album.service');
const { SuccessArrayResponse, SuccesResponse } = require('../utils/success.response');


const albumController ={
    /**
     * Get All
     * @param {Request} req 
     * @param {Response} res 
     */
    getAll : async(req,res) => {
        const {offset,limit}=req.pagination;
        const {albums,count} = await albumService.getAll(offset,limit);
        res.status(200).json(new SuccessArrayResponse(albums,count));
    },
    /**
     * Get All
     * @param {Request} req 
     * @param {Response} res 
     */

    getById : async (req,res)=>{
        const {id} = req.params;
        const album = await albumService.getById(id);
        if(!album){
            res.sendStatus(404);
            return;
        }
        res.status(200).json(new SuccesResponse(album));

    },
    /**
    * Get All
    * @param {Request} req 
    * @param {Response} res 
    */
    create : async (req,res)=>{
        const data = req.body;
        const album = await albumService.create(data);
        res.location('/album/'+album.id);
        res.status(201).json(new SuccesResponse(album,201))
        
    },
    /**
     * Get All
     * @param {Request} req 
     * @param {Response} res 
     */
    update : async(req,res)=>{
        const {id} = req.params;
        const data = req.body;
        const updated = await albumService.update(id, data);
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
        const deleted = await albumService.delete(id);
        if(!deleted){
            res.sendStatus(404);
            return;
        }
        res.sendStatus(204);
        
    }
}

module.exports = albumController;