import Task from "../models/task.js";
import rabbitMQ from '../broker/index.js'

const channel = await rabbitMQ()

const createTask = async (req,res) => {
    try {
        const {title, description, userId} = req.body
        if (!title || !description || !userId) res.status(400).json({message: 'No data provided'})
        const task = new Task({
            title,
            description,
            userId
        })
 
        await task.save()

        const message = {taskId: task._id, userId, title}
        if(!channel) {
            return res.status(503).json({error: 'RabbitMQ not connected'})
        }

        channel.sendToQueue('task_created', Buffer.from(JSON.stringify(message)))

        res.status(200).json({
            task
        })
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
}

export default createTask