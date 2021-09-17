const ApiError = require('../error/ApiError');
const {Project} = require('../models/models')

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
        const {id} = req.params
        const proj = await Project.findOne(
            {where:{id}}
        )
        return res.json(proj)
    }
    async getAll(req, res) {
       return await res.json(Project.findAll());
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
        const {id} = req.params
        const proj = await Project.destroy(
            {where: {id}},
        )
        return res.json(proj)
    }
}
module.exports = new ProjectController()
