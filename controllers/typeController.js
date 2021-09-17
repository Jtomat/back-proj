const {Type} = require('../models/models')
const ApiError = require('../error/ApiError')
class TypeController{
    async create(req, res, next){
        try{
            const {name} = req.body
            const type = await Type.create({name})
            return res.json(type)
        } catch (e){
            next(ApiError.badRequest(e.message))
        }
    }
    async getAll(req, res){
        const types = await Type.findAll()
        return res.json(types)
    }
    async getOne(req, res){
        const {id} = req.params
        const type = await Type.findOne(
            {where:{id}}
        )
        return res.json(type)
    }
    async update(req, res, next){
        try{
            const {id} = req.params
            let {name} = req.body
            const cur_type = await Type.findOne({where:{id}})
            if(!name){
                name = cur_type.name;
            }else{
                const candidate1 = await Type.findOne({where: {name}})
                if(candidate1){
                    return next(ApiError.badRequest('Тип с таким name уже существует'))
                }
            }
            const type = await cur_type.update({name:name})
            return res.json({type})
        }
        catch (e){
            next(ApiError.badRequest(e.message))
        }
    }
    async delete(req, res){
        const {id} = req.params
        const type = await Type.destroy(
            {where: {id}},
        )
        return res.json(type)
    }
}

module.exports = new TypeController()