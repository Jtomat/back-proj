const Router = require('express')
const router = new Router()
const projectController = require('../controllers/()projectController');


router.post('/add', projectController.create)
router.get('/', projectController.getAll)
router.get('/excel', projectController.excel)
router.get('/:id', projectController.getOne)
router.delete('/remove/:id', projectController.delete)
router.put('/edit/:id', projectController.update)


module.exports = router
