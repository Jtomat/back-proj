const Router = require('express')
const router = new Router()
const markController = require('../controllers/markController')

router.post('/',markController.create)
router.get('/',markController.getAll)
router.get('/:id',markController.getOne)
router.put('/:id', markController.update)
router.delete('/:id', markController.delete)

module.exports = router