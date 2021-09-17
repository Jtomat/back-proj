const {Publicator} = require('../models/models')
const ApiError = require('../error/ApiError')
class PublicatorController{
    async create(req, res, next){
        try {
            const {name, link, address} = req.body
            const publicator = await Publicator.create({name, link, address})
            return res.json(publicator)
        } catch (e){
            next(ApiError.badRequest(e.message))
        }
    }
    async getAll(req, res){
        const publicators = await Publicator.findAll()
        return res.json(publicators)
    }
    async getOne(req, res){
        const {id} = req.params
        const publicator = await Publicator.findOne(
            {where:{id}}
        )
        return res.json(publicator)
    }
    async update(req, res, next){
        try{
            const {id} = req.params
            let {name, link, address} = req.body
            const cur_publicator = await Publicator.findOne({where:{id}})
            if(!name){
                name = cur_publicator.name;
            }else{
                const candidate1 = await Publicator.findOne({where: {name}})
                if(candidate1){
                    return next(ApiError.badRequest('Издатель с таким name уже существует'))
                }
            }
            if(!link){
                link = cur_publicator.link;
            }
            if(!address){
                address= cur_publicator.address;
            }
            const publicator = await cur_publicator.update({name:name, link:link, address:address})
            return res.json({publicator})
        }
        catch (e){
            next(ApiError.badRequest(e.message))
        }
    }
    async delete(req, res){
        const {id} = req.params
        const publicator= await Publicator.destroy(
            {where: {id}},
        )
        return res.json(publicator)
    }
}

module.exports = new PublicatorController()