const { Router } = require('express');
const router = Router();
// const verifyToken = require('../middlewares/VerifyToken');
// const verifyRole = require('../middlewares/verifyRole');
const basicAuth = require('../middlewares/basicAuth');

const MediaController = require('../controllers/MediaController');

//Public Route
router.get('/', (req, res) => {
    res.json({ message: 'Welcome to Api Fileserver' })
});


//Fileserver API
router.post("/api/media/create-media", basicAuth, MediaController.createMedia)
router.delete("/api/media/delete-media/:fileId", basicAuth, MediaController.deleteMedia)



module.exports = router;