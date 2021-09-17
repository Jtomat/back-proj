const ApiError = require('../error/ApiError');
const {Task} = require('../models/models')
const {Op} = require("sequelize")

class TaskController{
    async create(req, res, next) {
        try {
            let { stageId, workerId, name } = req.body;
            const task = await Task.create({stageId, workerId, name})
            return res.json(task)
        }
        catch (e){
            next(ApiError.badRequest(e.message))
        }
    }
    async getAll(req, res) {
        try {
            let {workerId, stageId} = req.params;
            const props = Object.getOwnPropertyNames(req.params);
            const array = [];
            props.forEach((propName) => {
                let obj = {};
                obj[propName.toString()] = req.params[propName];
                array.push(obj);
            });
            const task = await Task.findAll({where: {[Op.and]: array}})
            return res.json(task);
        }catch (e) {
            console.log(e)
        }
    }
    async _get(id){
        const props = ['stageId'];
        const array = [];
        props.forEach((propName) => {
            let obj = {};
            obj[propName.toString()] = id;
            array.push(obj);
        });
        const task = await Task.findAll({where: {[Op.and]: array}})
        return task;
    }
    async getOne(req, res) {
        try {
            const {id} = req.params
            const task = await Task.findOne(
                {where: {id}}
            )
            return res.json(task)
        }catch (e) {
            console.log(e)
        }
    }
    async update(req, res, next) {
        try{
            const {id} = req.params;
            let {  workerId, name, finished } = req.body;
            const cur_task = await Task.findOne({where:{id}});
            const task = await cur_task.update({name:name, workerId: workerId, finished: finished});
            return res.json({task});
        }
        catch (e){
            next(ApiError.badRequest(e.message))
        }
    }
    async delete(req, res){
        try {
            const {id} = req.params
            const task = await Task.destroy(
                {where: {id}},
            )
            return res.json(task)
        }catch (e) {
            console.log(e)
        }
    }
}
module.exports = new TaskController();
