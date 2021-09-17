const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const roleController = require('../controllers/()workerRoleController')
const authMiddleware = require("../middleware/authMiddleware")

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/auth',authMiddleware, userController.check)
router.get('/',userController.getAll)
router.get('/:id',userController.getOne)
router.put('/', authMiddleware, userController.update)
router.delete('/:id', authMiddleware, userController.delete)
router.put('/conf/roles/:id', roleController.update)
router.post('/conf/roles/', roleController.create)
router.delete('/conf/roles/:id', roleController.delete)
router.put('/conf/roles/:id', roleController.update)

module.exports = router
