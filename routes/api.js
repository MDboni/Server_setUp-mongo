import express from "express";
const router = express.Router();

import * as TaskController from "../app/controller/TaskController.js";
import * as UsersController from "../app/controller/UsersController.js";
import AuthMiddleware from "../app/middlewares/AuthMiddleware.js";


// User [Before Login]
router.post("/Registration",UsersController.Registration)
router.post("/Login",UsersController.Login)
router.get("/EmailVerify",UsersController.EmailVerify)
router.get("/CodeVerify",UsersController.CodeVerify)
router.post("/ResetPassword",UsersController.ResetPassword)


// User [After Login]
router.get("/ProfileDetails",AuthMiddleware,UsersController.ProfileDetails)
router.put("/ProfileUpdate",AuthMiddleware,UsersController.ProfileUpdate)


// Task [After Login]
router.post("/CreateTask",AuthMiddleware,TaskController.CreateTask)
router.patch("/UpdateTaskStatus",AuthMiddleware,TaskController.UpdateTaskStatus)
router.get("/TaskListByStatus",AuthMiddleware,TaskController.TaskListByStatus)
router.delete("/DeleteTask",AuthMiddleware,TaskController.DeleteTask)
router.get("/CountTask",AuthMiddleware,TaskController.CountTask)


export default router;