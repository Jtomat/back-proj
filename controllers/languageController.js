const {Language} = require('../models/models')
const ApiError = require('../error/ApiError')
class LanguageController{
    async create(req, res, next){
        try{
        const {name, lang_group} = req.body
        const language = await Language.create({name, lang_group})
        return res.json(language)
        } catch (e){
            next(ApiError.badRequest(e.message))
        }
    }
    async getAll(req, res){
        const languages = await Language.findAll()
        return res.json(languages)
    }
    async getOne(req, res){
        const {id} = req.params
        const language = await Language.findOne(
            {where:{id}}
        )
        return res.json(language)
    }
    async update(req, res, next){
        try{
            const {id} = req.params
            let {name, lang_group} = req.body
            const cur_language = await Language.findOne({where:{id}})
            if(!name){
                name = cur_language.name;
            }else{
                const candidate1 = await Language.findOne({where: {name}})
                if(candidate1){
                    return next(ApiError.badRequest('Язык с таким name уже существует'))
                }
            }
            if(!lang_group){
                lang_group = cur_language.lang_group;
            }
            const language = await cur_language.update({name:name, lang_group:lang_group})
            return res.json({language})
        }
        catch (e){
            next(ApiError.badRequest(e.message))
        }
    }
    async delete(req, res){
        const {id} = req.params
        const language = await Language.destroy(
            {where: {id}},
        )
        return res.json(language)
    }
}

module.exports = new LanguageController()