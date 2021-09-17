const ApiError = require('../error/ApiError');
const {WorkerRole} = require('../models/models')

class WorkerRoleController{
    async create(req, res, next) {
        try {
            let { name, rate } = req.body;
            const wr = await WorkerRole.create({name, rate})
            return res.json(wr)
        }
        catch (e){
            next(ApiError.badRequest(e.message))
        }
    }
    async update(req, res, next) {
        try{
            const {id} = req.params;
            let { name, rate } = req.body;
            const cur_wr = await WorkerRole.findOne({where:{id}});
            const wr = await cur_wr.update({name:name, rate:rate});
            return res.json({wr});
        }
        catch (e){
            next(ApiError.badRequest(e.message))
        }
    }
    async getAll(req, res) {
        return await res.json(WorkerRole.findAll());
    }
    async getOne(req, res){
        const {id} = req.params
        const wr = await WorkerRole.findOne(
            {where:{id}}
        )
        return res.json(wr)
    }
    async delete(req, res) {
        const {id} = req.params
        const wr = await WorkerRole.destroy(
            {where: {id}},
        )
        return res.json(wr)
    }
}
module.exports = new WorkerRoleController();
