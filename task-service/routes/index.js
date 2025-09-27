import createTask from "../controllers/taskCreate.js";
import getTasks from "../controllers/getTasks.js";
import { Router } from "express";

const router = Router()

router.get('/', async (req,res) => {
    return res.send('Task service is working')
})

router.get('/tasks/all', getTasks)
router.post('/tasks/create', createTask)

export default router