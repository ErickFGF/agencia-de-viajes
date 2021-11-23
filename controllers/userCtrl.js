const Users = require('../models/userModel')
const bcrypt = require ('bcrypt')

const userCtrl = {
    register: async (req, res) =>{
        try{
            const{name, email, password} = req.body;

            const user = await Users.fiindOne({email})
            if(user) return res.status(400).json({msg: "The user already exists."})

            if(password.length<6)
                return res.status(400).json({msg: "Password needs to be at least 6 characters long."})
            
            const passwordHash = await bcrypt.hash(password, 10)
            const newUser = new Users({
                name, email, password: passwordHash
            })

            res.json({msg: "Register Success!"})

        }catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}

module.exports = userCtrl