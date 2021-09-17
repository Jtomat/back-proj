require('dotenv').config()
const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {AppUser: AppUser} = require('../models/models')
const WorkerController = require('../controllers/()workerController')

const generateJwt = (id,name, email) => {
    return jwt.sign(
        {id: id, name, email},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class UserController {
    async registration(req, res, next) {
        try {
            const {name, email, password} = req.body
            if (!password) {
                return next(ApiError.badRequest('Некорректный password' + password))
            }
            if (!email) {
                return next(ApiError.badRequest('Некорректный email' + email))
            }
            const candidate = await AppUser.findOne({where: {email}})
            if (candidate) {
                return next(ApiError.badRequest('Пользователь с таким email уже существует'))
            }
            const hashPassword = await bcrypt.hash(password, 5)
            let appUser = await AppUser.create({name, email, password: hashPassword})
            const defWorker = await WorkerController.create({ body:{userId: appUser.id, workerRoleId: 0}}, {}, next);
            const id = appUser.id;
            appUser = AppUser.findOne(
                {where: {id}}
            )
            const token = generateJwt(appUser.id, name, email)

            return res.json({token})
        }catch (e){
            next(ApiError.badRequest(e.message))
        }
    }
    async login(req, res, next){
        try {
            const {email, password} = req.body
            const author = await AppUser.findOne({where: {email}})
            if (!author) {
                return next(ApiError.internal('Пользователь не найден'))
            }
            let comparePassword = bcrypt.compareSync(password, author.password)
            if (!comparePassword) {
                return next(ApiError.internal('Пароль некорректен'))
            }
            const token = generateJwt(author.id, author.name, author.email)
            return res.json({token})
        }catch (e){
            next(ApiError.badRequest(e.message))
        }
    }
    async check(req, res, next){
        try {

            const token = generateJwt(req.author.id, req.author.name, req.author.email)
            return res.json({token})
        }catch (e){
            next(ApiError.badRequest(e.message))
        }
    }
    async getAll(req, res){
        try {
            let users;
            users = await AppUser.findAll()
            return res.json(users)
        }catch (e){
            console.log(e);
            return res.json({e})
        }
    }
    async getOne(req, res){
        try {

            const {id} = req.params
            const user = await AppUser.findOne(
                {where: {id}}
            )
            return res.json(user)
        }catch (e){
            next(ApiError.badRequest(e.message))
        }
    }
    async update(req, res, next){
        try {
            let {name, email, password} = req.body
            const id = req.author.id;
            const cur_author = await AppUser.findOne({where: {id}})

            if (email === undefined) {
                email = cur_author.email;
            } else {
                const candidate1 = await AppUser.findOne({where: {email}})
                if (candidate1) {
                    return next(ApiError.badRequest('Пользователь с таким email уже существует'))
                }
            }
            if (!name) {
                name = cur_author.name;
            }
            if (!password) {
                password = cur_author.password;
            }
            const hashPassword = await bcrypt.hash(password, 5)
            const appUser = await (await (AppUser.findOne(
                {where: {id}},
            ))).update({name: name, email: email, password: hashPassword},)
            const token = generateJwt(id, name, email)
            return res.json({token})
        }catch (e){
            next(ApiError.badRequest(e.message))
        }
    }
    async delete(req, res){
        try{
        const {id} = req.params
        const user = await AppUser.destroy(
            {where: {id}},
        )
        return res.json(user)
        }catch (e){
            console.log(e);
            return res.json({e})
        }
    }
}

module.exports = new UserController()
