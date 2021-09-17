const Router = require('express')
const router = new Router()
const taskController = require('../controllers/()taskController');

router.get('/user/tasks', taskController.getAll)
router.get('/user/project/stages/task', taskController.getAll)
router.get('/project/stages/task/add', taskController.create)
router.get('/project/stages/task/:id', taskController.getOne)
router.delete('/project/stages/task/remove/:id', taskController.delete)
router.put('/project/stages/task/edit/:id', taskController.update)


module.exports = router
