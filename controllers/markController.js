const {Mark} = require('../models/models')
const ApiError = require('../error/ApiError')
class MarkController{
    async create(req, res, next){
        try{
            const {rate, content, authorId, publicationId} = req.body
            const mark = await Mark.create({rate, content, authorId, publicationId})
            console.log(res.json(mark))
            return mark
        } catch (e){
            next(ApiError.badRequest(e.message))
        }
    }
    async getAll(req, res){
        const {authorId, publicationId} = req.query
        let marks;
        if(!authorId && !publicationId){
            marks = await Mark.findAll()
        }
        if(authorId && !publicationId){
            marks = await Mark.findAll({where: {authorId}})
        }
        if(!authorId && publicationId){
            marks = await Mark.findAll({where: {publicationId}})
        }
        if(authorId && publicationId){
            marks = await Mark.findAll({where: {authorId, publicationId}})
        }
        return res.json(marks)
    }
    async getOne(req, res){
        const {id} = req.params
        const mark = await Mark.findOne(
            {where:{id}}
        )
        return res.json(mark)
    }
    async update(req, res, next){
        try{
            const {id} = req.params
            let {rate, content, authorId, publicationId} = req.body
            const cur_mark = await Mark.findOne({where:{id}})
            if(!rate) {
                rate = cur_mark.rate;
            }else{
            }
            if(!content) {
                content = cur_mark.content;
            }else{
            }
            if(!authorId) {
                authorId = cur_mark.authorId;
            }else{
            }
            if(!publicationId) {
                publicationId = cur_mark.publicationId;
            }else{
            }
            const mark = await cur_mark.update({rate:rate, content:content, authorId:authorId, publicationId:publicationId})
            return res.json({mark})
        }
        catch (e){
            next(ApiError.badRequest(e.message))
        }
    }
    async delete(req, res){
        const {id} = req.params
        const mark = await Mark.destroy(
            {where: {id}},
        )
        return res.json(mark)
    }
}

module.exports = new MarkController()