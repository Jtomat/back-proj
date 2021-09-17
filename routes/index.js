const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const projectRouter = require('./()projectRouter')
const stageRouter = require('./()stageRouter')
const taskRouter = require('./()taskRouter')


router.use('/', userRouter);
router.use('/', projectRouter);
router.use('/', stageRouter);
router.use('/', taskRouter);
    /*
router.use('/publication', publicationRouter)
router.use('/publicator', publicatorRouter)
router.use('/mark', markRouter)
router.use('/theme', themeRouter)
router.use('/topic', topicRouter)
router.use('/language', languageRouter)
router.use('/dialect', dialectRouter)
router.use('/type', typeRouter)
router.use('/region', regionRouter)
*/
module.exports = router
