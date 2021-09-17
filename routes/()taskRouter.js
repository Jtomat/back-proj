const Router = require('express')
const router = new Router()
const taskController = require('../controllers/()taskController');

router.get('/user', taskController.getAll)
router.get('/', taskController.getAll)
router.get('/add', taskController.create)
router.get('/open/:id', taskController.getOne)
router.delete('/remove/:id', taskController.delete)
router.put('/edit/:id', taskController.update)


module.exports = router
