import { Router } from "express";
import getUsers from "../controllers/getUsers.js";
import createUser from "../controllers/userCreate.js";

const router = Router()

router.get('/', async (req,res) => {
    return res.send('User service is working')
})

router.get('/users/all', getUsers)
router.post('/users/create', createUser)

export default router