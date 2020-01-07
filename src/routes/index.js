const {Router} = require('express')
const router = Router()

const HomeController =  require('../controller/HomeController')
const ImageController = require('../controller/ImageController.js')

router.get('/', HomeController.index)
router.get('/image/:image_id', ImageController.index)
router.post('/image', ImageController.create)
router.post('/image/:image_id/likes', ImageController.like)
router.post('/image/:image_id/comment', ImageController.comment)
 router.delete('/image/:image_id',ImageController.remove)
 
module.exports = router