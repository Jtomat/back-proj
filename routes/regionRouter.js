const Router = require('express')
const router = new Router()
const regionController = require('../controllers/regionController')

router.post('/',regionController.create)
router.get('/',regionController.getAll)
router.get('/:id',regionController.getOne)
router.put('/:id', regionController.update)
router.delete('/:id', regionController.delete)

module.exports = router