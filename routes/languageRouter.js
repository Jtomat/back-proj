const Router = require('express')
const router = new Router()
const languageController = require('../controllers/languageController')

router.post('/',languageController.create)
router.get('/',languageController.getAll)
router.get('/:id',languageController.getOne)
router.put('/:id', languageController.update)
router.delete('/:id', languageController.delete)

module.exports = router