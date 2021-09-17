const ApiError = require('../error/ApiError');
const {Worker} = require('../models/models')
const {Op} = require("sequelize")

class WorkerController {
    async create(req, res, next) {
        try {
            let { userId, workerRoleId } = req.body;
            const wr = await Worker.create({userId, workerRoleId})
            return res.json(wr)
        }
        catch (e){
            next(ApiError.badRequest(e.message))
        }
    }
    async update(req, res, next) {
        try{
            const {id} = req.params;
            let { userId, workerRoleId } = req.body;
            const cur_wr = await Worker.findOne({where:{id}});
            const wr = await cur_wr.update({userId:userId, workerRoleId: workerRoleId});
            return res.json({wr});
        }
        catch (e){
            next(ApiError.badRequest(e.message))
        }
    }
    async getAll(req, res) {
        return await res.json(Worker.findAll());
    }
    async getOne(req, res){
        const {id} = req.params
        const wr = await Worker.findOne(
            {where:{id}}
        )
        return res.json(wr)
    }
    async delete(req, res) {
        const {id} = req.params
        const wr = await Worker.destroy(
            {where: {id}},
        )
        return res.json(wr)
    }
}

module.exports = new WorkerController();
