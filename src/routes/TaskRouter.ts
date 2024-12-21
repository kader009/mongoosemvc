import { Router } from "express";
import { taskController } from "../controller/TaskController";

const router = Router()

router.post('/', taskController.createTask)


export default router;