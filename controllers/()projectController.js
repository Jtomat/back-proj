const ApiError = require('../error/ApiError');
const {Project} = require('../models/models')
const {StageController:StageController} = require('../controllers/()stageController');
const {TaskController:TaskController} = require('../controllers/()taskController');
const {WorkerController:WorkerController} = require('../controllers/()workerController');
const {UserController:UserController} = require('../controllers/userController');

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
       return await res.json(Project.findAll());
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
