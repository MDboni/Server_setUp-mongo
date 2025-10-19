import express from "express";
const router = express.Router();

import * as UsersController from "../app/controller/UsersController.js";
import * as UpdateController from '../app/controller/UpdateController.js'


router.post('/Update', UpdateController.update)

router.post('/InseartData', UsersController.InseartData)
router.post('/regi', UsersController.regi)


router.get('/TokenEncode', UsersController.regi)



export default router;