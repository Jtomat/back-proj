const ApiError = require('../error/ApiError');
const {Worker} = require('../models/models')
const {Op} = require("sequelize")

class WorkerController {
    async _create(req){
        let { appuserId, workerRoleId } = req.body;
        const wr = await Worker.create({appuserId, workerRoleId})
        return wr;
    }
    async _get(id){
        const wr = await Worker.findOne(
            {where: {id}}
        )
        return wr
    }
    async create(req, res, next) {
        try {

            return res.json(wr)
        }
        catch (e){
            next(ApiError.badRequest(e.message))
        }
    }
    async update(req, res, next) {
        try{
            const {id} = req.params;
            let { appuserId, workerRoleId } = req.body;
            const cur_wr = await Worker.findOne({where:{id}});
            const wr = await cur_wr.update({appuserId:appuserId, workerRoleId: workerRoleId});
            return res.json({wr});
        }
        catch (e){
            next(ApiError.badRequest(e.message))
        }
    }
    async getAll(req, res) {
        try {
            return await res.json(Worker.findAll());
        }catch (e) {
            console.log(e)
        }
    }
    async getOne(req, res){
        try {
            const {id} = req.params
            const wr = await Worker.findOne(
                {where: {id}}
            )
            return res.json(wr)
        }catch (e) {
            console.log(e)
        }
    }
    async delete(req, res) {
        try {
            const {id} = req.params
            const wr = await Worker.destroy(
                {where: {id}},
            )
            return res.json(wr)
        }catch (e) {
            console.log(e)
        }
    }
}

module.exports = new WorkerController();
