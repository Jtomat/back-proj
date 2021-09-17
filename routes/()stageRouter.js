const Router = require('express')
const router = new Router()
const stageController = require('../controllers/()stageController');

router.get('/project/stages', stageController.getAll)
router.post('/project/stages/add', stageController.create)
router.get('/project/stages/:id', stageController.getOne)
router.delete('/project/stages/remove/:id', stageController.delete)
router.put('/project/stage/edit/:id', stageController.update)


module.exports = router
