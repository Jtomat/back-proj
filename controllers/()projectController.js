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
        try {
            result = await Project.findAll()
            for (let pr of result) {
                stages = await StageController._get(pr.id);
                for (let st of stages){
                    let task = await TaskController._get(st.id);
                    for (let t of task) {
                        worker = await WorkerController._get(t.workerId);
                        user = await UserController._get(worker.appuserId)
                        role = await WorkerRoleController._get(worker.workerRoleId)
                        worker.user = user;
                        worker.workerRole = role;
                        task.worker = worker;
                    }
                    st.tasks = task;
                }
                pr.stages = stages;
            }
            return res.json(result);
        }catch (e) {
            console.log(e)
            return res.json({e, result, stages, worker, user, role})
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
        const array = [[ "Проект", "Стадии", "Задачи","Сотрудник", "%"],];
        const projects = await this._getAll();
        for (const pr of projects) {
           const sts = await StageController._get(pr.id);
           for (const st of sts){
               const tasks = await TaskController._get(st.id);
               for (const task of tasks) {
                   const worker = await WorkerController._get(task.workerId);
                   let user = {};
                   if (worker){
                       user = await UserController._get(worker.userId);
                   }
                   array.push([pr.name, st.name, task.name, worker ? user.name : "Отсутствует", task.finished ])
               }
           }
        }
        return res.json(array);
    }
}
module.exports = new ProjectController()
