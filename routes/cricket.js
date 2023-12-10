const path=require('path');

const express=require('express')


const playerController=require('../controllers/cricket');

const router=express.Router();

router.get("/cricket/get-player",playerController.boom)
router.get("/cricket/get-player/:name",playerController.getPLayer)
router.post("/cricket/post-player",playerController.postPLayer)
router.put("/cricket/put-player/:id",playerController.putPLayer)



module.exports = router;