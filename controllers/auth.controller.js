const { Request, Response } = require('express');
const authService = require('../services/auth.service');
const ErrorResponse = require('../utils/error.response');
const { SuccesResponse } = require('../utils/success.response');

const authController={
    /**
     * Registre
     * @param {Request} req
     * @param {Response} res
     * 
     */
    
    register : async (req,res)=>{
        const data = req.body;
        const user = await authService.register(data);
        if(!user){
            res.sendStatus(400); //Bad request les donnees ne sont pas bon
            return;
        }
        res.status(201).json(new SuccesResponse(user,201))
    },
    /**
     * Registre
     * @param {Request} req
     * @param {Response} res
     * 
     */
    login:async (req,res)=>{
        // on recupere du body les deux infos qui nous interessent 
        const {email,password} = req.body;
        //appel du service
        const user = await authService.login(email,password);
        //si pas de user -> erreur de login
        if(!user){
            res.status(400).json(new ErrorResponse("Bad credentials"))
            return;
        }
        res.status(200).json(new SuccesResponse(user))
    }

}
module.exports=authController;