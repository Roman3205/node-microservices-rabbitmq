import User from "../models/user.js";


const getUsers = async (req,res) => {
    try {
        const users = await User.find().limit(100)

        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

export default getUsers