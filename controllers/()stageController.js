const ApiError = require('../error/ApiError');
const {Stage} = require('../models/models')
const {Op} = require("sequelize")

class StageController{
    async create(req, res, next) {
        try {
            let { projectId, name, dateStart, dateEnd } = req.body;
            dateStart = new Date(dateStart);
            dateEnd = new Date(dateEnd);
            const stage = await Stage.create({projectId, name, dateStart, dateEnd})
            // TODO: Create oper report for stage by OpRepCtrl
            return res.json(stage)
        }
        catch (e){
            next(ApiError.badRequest(e.message))
        }
    }
    async getAll(req, res) {
        try {
            let {projectId} = req.params;
            const stages = (await Stage.findAll()).filter(item=>item.projectId===projectId)
            return res.json(stages);
        }catch (e) {
            console.log(e)
        }
    }
    async getOne(req, res) {
        try {
            const {id} = req.params
            const stage = await Stage.findOne(
                {where: {id}}
            )
            return res.json(stage)
        }catch (e){
            console.log(e)
        }
    }
    async _get(id){
        const stages = (await Stage.findAll())
        return stages;
    }
    async update(req, res, next) {
        try{
            const {id} = req.params;
            let { name, dateStart, dateEnd } = req.body;
            dateStart = new Date(dateStart);
            dateEnd = new Date(dateEnd);
            const cur_st = await Stage.findOne({where:{id}});
            const st = await cur_st.update({name:name, dateStart: dateStart, dateEnd: dateEnd});
            return res.json({st});
        }
        catch (e){
            next(ApiError.badRequest(e.message))
        }
    }
    async delete(req, res) {
        try {
            const {id} = req.params
            const st = await Stage.destroy(
                {where: {id}},
            )
            return res.json(st)
        }catch (e) {
            console.log(e)
        }
    }
}
module.exports = new StageController();
