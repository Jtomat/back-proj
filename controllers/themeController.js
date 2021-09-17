const {Theme} = require('../models/models')
const ApiError = require('../error/ApiError')
class ThemeController{
    async create(req, res, next){
        try {
            const {name} = req.body
            const theme = await Theme.create({name})
            return res.json(theme)
        }
        catch (e){
            next(ApiError.badRequest(e.message))
        }
    }
    async getAll(req, res){
        const themes = await Theme.findAll()
        return res.json(themes)
    }
    async getOne(req, res){
        const {id} = req.params
        const theme = await Theme.findOne(
            {where:{id}}
        )
        return res.json(theme)
    }
    async update(req, res, next){
        try{
            const {id} = req.params
            let {name} = req.body
            const cur_theme = await Theme.findOne({where:{id}})
            if(!name){
                name = cur_theme.name;
            }else{
                const candidate1 = await Theme.findOne({where: {name}})
                if(candidate1){
                    return next(ApiError.badRequest('Тема с таким name уже существует'))
                }
            }
            const theme = await cur_theme.update({name:name})
            return res.json({theme})
        }
        catch (e){
            next(ApiError.badRequest(e.message))
        }
    }
    async delete(req, res){
        const {id} = req.params
        const theme = await Theme.destroy(
            {where: {id}},
        )
        return res.json(theme)
    }
}

module.exports = new ThemeController()