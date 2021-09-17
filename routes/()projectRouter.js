const Router = require('express')
const router = new Router()
const projectController = require('../controllers/()projectController');


router.post('/project/add', projectController.create)
router.get('/projects', projectController.getAll)
router.get('/projects/excel', projectController.excel)
router.get('/project/:id', projectController.getOne)
router.delete('/project/remove/:id', projectController.delete)
router.put('/project/edit/:id', projectController.update)


module.exports = router
