const Router = require('express')
const router = new Router()
const publicatorController = require('../controllers/publicatorController')

router.post('/',publicatorController.create)
router.get('/',publicatorController.getAll)
router.get('/:id',publicatorController.getOne)
router.put('/:id', publicatorController.update)
router.delete('/:id', publicatorController.delete)

module.exports = router