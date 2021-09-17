const Router = require('express')
const router = new Router()
const stageController = require('../controllers/()stageController');

router.get('/', stageController.getAll)
router.post('/add', stageController.create)
router.get('/:id', stageController.getOne)
router.delete('/remove/:id', stageController.delete)
router.put('/edit/:id', stageController.update)


module.exports = router
