const {Topic} = require('../models/models')
const ApiError = require('../error/ApiError')
class TopicController{
    async create(req, res, next){
        try{
            const {subject, themeId} = req.body

            const topic = await Topic.create({subject, themeId})

            return res.json(topic)
        } catch (e){
            next(ApiError.badRequest(e.message))
        }
    }
    async getAll(req, res){
        const {themeId} = req.query
        let topics;
        if(!themeId){
            topics = await Topic.findAll()
        }
        if(themeId){
            topics = await Topic.findAll({where: {themeId}})
        }
        return res.json(topics)
    }
    async getOne(req, res){
        const {id} = req.params
        const topic = await Topic.findOne(
            {where:{id}}
        )
        return res.json(topic)
    }
    async update(req, res, next){
        try{
            const {id} = req.params
            let {subject, themeId} = req.body
            const cur_topic = await Topic.findOne({where:{id}})
            if(!subject){
                subject = cur_topic.subject;
            }else{
                const candidate1 = await Topic.findOne({where: {subject}})
                if(candidate1){
                    return next(ApiError.badRequest('Тема с таким name уже существует'))
                }
            }
            if(!themeId){
                themeId = cur_topic.themeId;
            }
            const topic = await cur_topic.update({subject:subject, themeId:themeId})
            return res.json({topic})
        }
        catch (e){
            next(ApiError.badRequest(e.message))
        }
    }
    async delete(req, res){
        const {id} = req.params
        const topic = await Topic.destroy(
            {where: {id}},
        )
        return res.json(topic)
    }
}

module.exports = new TopicController()