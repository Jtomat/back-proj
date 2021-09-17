const uuid = require('uuid')
const path = require("path")
const {Publication} = require('../models/models')
const ApiError = require('../error/ApiError');
const {Op} = require("sequelize")
class PublicationController{
    async create(req, res, next){
        try{
            const {title, short_review, pages, date_publ, date_create, authorId, regionId, publicatorId, typeId, dialectId, themeId} = req.body
            const {file} = req.files
            let fileName = uuid.v4() + ".txt"
            file.mv(path.resolve(__dirname, '..', 'static', fileName))

            const publication = await Publication.create({title, short_review, pages, date_publ, date_create, authorId, regionId, publicatorId, typeId, dialectId, themeId, file: fileName})

            return res.json(publication)
        } catch (e){
            next(ApiError.badRequest(e.message))
        }
    }
    async getAll(req, res){
        let {authorId, regionId, publicatorId, typeId, dialectId, themeId, limit, page} = req.body
        const props = Object.getOwnPropertyNames(req.body);
        const array = [];
        props.forEach((propName) => {
            if (propName !== 'limit' && propName !== 'page') {
                let obj = {};
                obj[propName.toString()] = req.body[propName];
                array.push(obj);
            }
        });
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let publications;
        publications = await Publication.findAndCountAll({where:{[Op.and]: array}, limit, offset})
        return res.json(publications)
    }
    async getOne(req, res){
        const {id} = req.params
        const publication = await Publication.findOne(
            {where:{id}}
        )
        return res.json(publication)
    }
    async update(req, res, next){
        try{
            const {id} = req.params
            let {title, short_review, pages, date_publ, date_create, authorId, regionId, publicatorId, typeId,
                dialectId, themeId} = req.body
            let file
            if(!req.files) {
            }
            else{
                file = req.files
            }
            const cur_publication = await Publication.findOne({where:{id}})
            let fileName
            if(!title){
                title = cur_publication.title;
            }
            if(!short_review){
                short_review = cur_publication.short_review;
            }
            if(!pages){
                pages = cur_publication.pages;
            }
            if(!date_publ){
                date_publ = cur_publication.date_publ;
            }
            if(!date_create){
                date_create = cur_publication.date_create;
            }
            if(!file){
                fileName = cur_publication.file;
            }
            else{
                fileName = uuid.v4() + ".txt"
                file.mv(path.resolve(__dirname, '..', 'static', fileName))
            }
            if(!authorId){
                authorId = cur_publication.authorId;
            }
            if(!regionId){
                regionId = cur_publication.regionId;
            }
            if(!publicatorId){
                publicatorId = cur_publication.publicatorId;
            }
            if(!typeId){
                typeId = cur_publication.typeId;
            }
            if(!dialectId){
                dialectId = cur_publication.dialectId;
            }
            if(!themeId){
                themeId = cur_publication.themeId;
            }
            const publication = await cur_publication.update({title:title, short_review:short_review,
                pages:pages, date_publ:date_publ, date_create:date_create, authorId:authorId, regionId:regionId,
                publicatorId:publicatorId, typeId:typeId, dialectId:dialectId, themeId:themeId, file: fileName})
            return res.json({publication})
        }
        catch (e){
            next(ApiError.badRequest(e.message))
        }
    }
    async delete(req, res){
        const {id} = req.params
        const publication = await Publication.destroy(
            {where: {id}},
        )
        return res.json(publication)
    }
}

module.exports = new PublicationController()