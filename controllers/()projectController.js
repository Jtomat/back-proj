const ApiError = require('../error/ApiError');
const {Project} = require('../models/models')
const StageController = require('../controllers/()stageController');
const TaskController = require('../controllers/()taskController');
const WorkerController = require('../controllers/()workerController');
const UserController = require('../controllers/userController');
const WorkerRoleController = require('../controllers/()workerRoleController');

class ProjectController {
    async create(req, res, next) {
        try {
            const { name, info } = req.body;
            const publication = await Project.create({name, info})
            return res.json(publication)
        }
        catch (e){
            next(ApiError.badRequest(e.message))
        }
    }
    async getOne(req, res){
        try {
            const {id} = req.params
            const proj = await Project.findOne(
                {where: {id}}
            )
            return res.json(proj)
        }catch (e) {
            console.log(e)
        }
    }
    async getAll(req, res) {
        let stages;
        let worker;
        let user;
        let role;
        let result;
        let rest;
        try {
            result = (await Project.findAll());
            rest = [];
            for (let pr =0; pr< result.length; pr++) {
                stages = await StageController._get(result[pr].id);
                let stg = []
                for (let st = 0; st < stages.length; st++){
                    let task = await TaskController._get(stages[st].id);
                    let tsk = [];
                    for (let t =0;t< task.length;t++) {
                        worker = await WorkerController._get(task[t].workerId);
                        user = await UserController._get(worker.appuserId)
                        role = await WorkerRoleController._get(worker.workerRoleId)
                        let workered = {id:worker.id, user:user, workerRole: role};
                        tsk.push({
                            id: task[t].id,
                            name: task[t].name,
                            info: task[t].info,
                            actDate: task[t].actDate,
                            dateEnd: task[t].dateEnd,
                            dateStart: task[t].dateStart,
                            finished: task[t].finished,
                            worker:workered});
                    }
                   stg.push({
                       name:stages[st].name,
                       id:stages[st].id ,
                       dateEnd:stages[st].dateEnd,
                       dateStart:stages[st].dateStart,
                       dateActualEnd:stages[st].dateActualEnd,
                       finished:stages[st].finished,
                       tasks:tsk});
                }
                rest.push({id:result[pr].id,name:result[pr].name, stages:stg});
            }
            return res.json(rest);
        }catch (e) {
            console.log(e)
        }
    }
    async _getAll(){
        return Project.findAll()
    }
    async update(req, res, next){
        try{
            const {id} = req.params;
            let { name, info } = req.body
            const cur_proj = await Project.findOne({where:{id}});
            const proj = await cur_proj.update({name:name, info: info});
            return res.json({proj});
        }
        catch (e){
            next(ApiError.badRequest(e.message))
        }
    }
    async delete(req, res){
        try {
            const {id} = req.params
            const proj = await Project.destroy(
                {where: {id}},
            )
            return res.json(proj)
        }catch (e) {
            console.log(e)
        }
    }

    async excel(req, res){
        try {
            const array = [["????????????", "????????????", "????????????", "??????????????????", "%"],];
            const projects = await new ProjectController()._getAll();
            for (const pr of projects) {
                const sts = await StageController._get(pr.id);
                for (const st of sts) {
                    const tasks = await TaskController._get(st.id);
                    for (const task of tasks) {
                        const worker = await WorkerController._get(task.workerId);
                        let user = {};
                        if (worker) {
                            user = await UserController._get(worker.appuserId);
                        }
                        array.push([pr?.name, st?.name, task?.name, worker ? user?.name : "??????????????????????", task?.finished])
                    }
                }
            }
            return res.json(array);
        }catch (e) {
            return res.json(e);
        }
    }
}
module.exports = new ProjectController()
