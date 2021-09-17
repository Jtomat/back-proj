const {Region} = require('../models/models')
const ApiError = require('../error/ApiError')

class RegionController{
    async create(req, res, next){
        try {
            const {name} = req.body
            const region = await Region.create({name})
            return res.json(region)
        }
        catch (e){
            next(ApiError.badRequest(e.message))
        }
    }
    async getAll(req, res){
        const regions = await Region.findAll()
        return res.json(regions)
    }
    async getOne(req, res){
        const {id} = req.params
        const region = await Region.findOne(
            {where:{id}}
        )
        return res.json(region)
    }
    async update(req, res, next){
        try{
            const {id} = req.params
            let {name} = req.body
            const cur_region = await Region.findOne({where:{id}})
            if(!name){
                name = cur_region.name;
            }else{
                const candidate1 = await Region.findOne({where: {name}})
                if(candidate1){
                    return next(ApiError.badRequest('Регион с таким name уже существует'))
                }
            }
            const region = await cur_region.update({name:name})
            return res.json({region})
        }
        catch (e){
            next(ApiError.badRequest(e.message))
        }
    }
    async delete(req, res){
        const {id} = req.params
        const region = await Region.destroy(
            {where: {id}},
        )
        return res.json(region)
    }
}

module.exports = new RegionController()