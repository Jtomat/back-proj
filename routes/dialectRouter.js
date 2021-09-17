const Router = require('express')
const router = new Router()
const dialectController = require('../controllers/dialectController')

router.post('/',dialectController.create)
router.get('/',dialectController.getAll)
router.get('/:id',dialectController.getOne)
router.put('/:id', dialectController.update)
router.delete('/:id', dialectController.delete)

module.exports = router