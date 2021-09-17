const Router = require('express')
const router = new Router()
const topicController = require('../controllers/topicController')

router.post('/',topicController.create)
router.get('/',topicController.getAll)
router.get('/:id',topicController.getOne)
router.put('/:id', topicController.update)
router.delete('/:id', topicController.delete)

module.exports = router