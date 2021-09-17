const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const authMiddleware = require("../middleware/authMiddleware")

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/auth',authMiddleware, userController.check)
router.get('/',userController.getAll)
router.get('/:id',userController.getOne)
router.put('/', authMiddleware, userController.update)
router.delete('/:id', authMiddleware, userController.delete)

module.exports = router
