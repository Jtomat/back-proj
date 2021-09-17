const ApiError = require('../error/ApiError');
const {Task} = require('../models/models')
const {Op} = require("sequelize")
const WorkerController = require('./()workerController')

class TaskController{
    async create(req, res, next) {
        try {
            let { stageId, workerId, name, info, dateStart, dateEnd } = req.body;
            const task = await Task.create({stageId, workerId, name, info, dateStart, dateEnd})
            return res.json(task)
        }
        catch (e){
            next(ApiError.badRequest(e.message))
        }
    }
    async getAll(req, res) {
        try {
            let {workerId} = req.params;
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


    async _getAll(req, res) {
        let id ;
        let worker ;
        let task;
        try {
            let result = {};
            id = req.params;
            worker = await WorkerController._getByUser(id.id);
            task = (await Task.findAll()).filter(item=>item.workerId === worker.id)
            for (let t of task){
                t.diff = (new Date(t.dateEnd) - new Date()).valueOf() % 3
                t.worker = worker;
            }
            let groupBy = (xs, key) =>{
                return xs.reduce(function(rv, x) {
                    (rv[x[key]] = rv[x[key]] || []).push(x);
                    return rv;
                }, {});
            };
            result = groupBy(task,'diff')
            return res.json(result);
        }catch (e) {
            console.log(e)
            return res.json({ req, task, worker, e})
        }
    }
    async _get(id){
        const task = (await Task.findAll()).filter(item=>item.stageId===id)
        return task;
    }
    async getForSt(req, res) {
        const {id} = req.params
        return this._get(id);
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
