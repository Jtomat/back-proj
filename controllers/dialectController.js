const {Dialect} = require('../models/models')
const ApiError = require('../error/ApiError')
class DialectController{
    async create(req, res, next){
        try{
            const {name, languageId} = req.body
            const dialect = await Dialect.create({name, languageId})

            return res.json(dialect)
        } catch (e){
            next(ApiError.badRequest(e.message))
        }
    }
    async getAll(req, res){
        const {languageId} = req.query
        let dialects;
        if(!languageId){
            dialects = await Dialect.findAll()
        }
        if(languageId){
            dialects = await Dialect.findAll({where: {languageId}})
        }
        return res.json(dialects)
    }
    async getOne(req, res){
        const {id} = req.params
        const dialect = await Dialect.findOne(
            {where:{id}}
        )
        return res.json(dialect)
    }
    async update(req, res, next){
        try{
            const {id} = req.params
            let {name, languageId} = req.body
            const cur_dialect = await Dialect.findOne({where:{id}})
            if(!name){
                name = cur_dialect.name;
            }else{
                const candidate1 = await Dialect.findOne({where: {name}})
                if(candidate1){
                    return next(ApiError.badRequest('Диалект с таким name уже существует'))
                }
            }
            if(!languageId) {
                languageId = cur_dialect.languageId;
            }else{
                // ВООБЩЕ СЮДА МОЖНО СУНТЬ ПРОВЕРКУ НА СУЩЕСТВОВАНИЕ ТАКОГО ЛЭНГ АЙДИ, НО ОН И НА ФРОНТЕ БУДТЕ ПРОВЕРЕН
            }

            const dialect = await cur_dialect.update({name:name, languageId:languageId})
            return res.json({dialect})
        }
        catch (e){
            next(ApiError.badRequest(e.message))
        }
    }
    async delete(req, res){
        const {id} = req.params
        const dialect = await Dialect.destroy(
            {where: {id}},
        )
        return res.json(dialect)
    }
}

module.exports = new DialectController()