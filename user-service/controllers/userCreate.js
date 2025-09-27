import User from "../models/user.js";


const createUser = async (req,res) => {
    try {
        const {name, email} = req.body
        if (!name || !email) res.status(400).json({message: 'No data provided'})
        
            const user = new User({
            name,
            email
        })
 
        await user.save()

        res.status(200).json({
            user
        })
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

export default createUser