const express = require('express')
const router = express.Router()
const{registerAmbulance, loginAmbulances, getMe, removeMe,updateMe} = require('../controllers/ambulanceController')
const{assignAmbulance,ResponseAccident,acceptAmbulance} = require('../controllers/assignAmbulanceController')

const {protect} = require('../middleware/ambulanceAuthMiddleware')

router.post('/',registerAmbulance);
router.post('/login',loginAmbulances);
router.get('/me',protect,getMe);
router.delete('/me',protect,removeMe);
router.put('/me',protect,updateMe);
router.post('/findaccident',assignAmbulance);
router.post('/acceptaccident',acceptAmbulance);
router.post('/responseaccident',ResponseAccident);

module.exports = router