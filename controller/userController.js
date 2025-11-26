const users = require("../model/userModel")
const jwt = require("jsonwebtoken")

//register
exports.registerController = async (req, res) => {
    console.log(`Inside Register Controller`);

    const { username, email, password } = req.body
    console.log(username, email, password);

    //logic

    try {
        const exisitingUser = await users.findOne({ email }) // {email : email}
        if (exisitingUser) {
            res.status(404).json("User Already Exists...Please Login!!")
        } else {
            const newUser = new users({
                username,  // username : username (same name)
                email,     // email : email
                password
            })
            await newUser.save()  // to save in mongoDB
            res.status(200).json(newUser)
        }

    } catch (error) {
        res.status(500).json(error)
    }

}

//login
exports.loginController = async (req, res) => {
    console.log("Inside login controller");
    const { email, password } = req.body
    console.log(email, password);

    //logic
    try {
        const exisitingUser = await users.findOne({ email })
        if (exisitingUser) {
            if (exisitingUser.password == password) {
                const token = jwt.sign({ userMail: exisitingUser.email }, process.env.JWTSecretKey) //secure login - jwt  {  to generate token - sign method }
                res.status(200).json({ exisitingUser, token })
            }
            else {
                res.status(404).json("Invalid Credentials!")
            }
        }
        else {
            res.status(401).json("User not found...Please Register")
        }
    } catch (error) {
        res.status(500).json(error)
    }
}
