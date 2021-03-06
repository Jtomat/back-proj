const ApiError = require('../error/ApiError');
const {Worker} = require('../models/models')
const {WorkerRole} = require('../models/models')
const {AppUser} = require('../models/models')
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
            const workers = (await Worker.findAll());
            const result = []
            for(let worker in workers){
                const user = (await AppUser.findOne({where: {id: workers[worker].appuserId}}));
                const role = (await WorkerRole.findOne({where:{id: workers[worker].workerRoleId}}));
                result.push({id:workers[worker].id, user, role})
            }
            return res.json(result);
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
