import Task from "../models/task.js";


const getTasks = async (req,res) => {
    try {
        const tasks = await Task.find().limit(100)

        res.status(200).json(tasks)
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

export default getTasks