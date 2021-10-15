const ApiError = require('../error/ApiError');
const {Worker} = require('../models/models')
const {WorkerRole} = require('../models/models')
const {AppUser: AppUser} = require('../models/models')
const userController = require('../controllers/userController')
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

    async _getByUser(appuserId){
        let wr = await Worker.findAll();
        return wr.filter(item=>item.appuserId==appuserId)[0];
    }

    async create(req, res, next) {
        try {
            return res.json(await this._create(req))
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
            const workers = await Worker.findAll();
            for(let worker in workers){
                worker.user = (await AppUser.getAll()).filter(user=>user.id===worker.appuserId)[0];
                worker.role = (await WorkerRole.getAll()).filter(user=>user.id===worker.workerRoleId)[0];
            }
            return res.json(workers);
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
