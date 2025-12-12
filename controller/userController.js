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
                const token = jwt.sign({ userMail: exisitingUser.email, role: exisitingUser.role }, process.env.JWTSecretKey) //secure login - jwt  {  to generate token - sign method }
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

//google-login
exports.googleLoginController = async (req, res) => {
    console.log("Inside Google login controller");
    const { email, password, username, profile } = req.body
    console.log(email, password, username, profile);

    //logic
    try {
        const exisitingUser = await users.findOne({ email })
        if (exisitingUser) {
            const token = jwt.sign({ userMail: exisitingUser.email, role: exisitingUser.role }, process.env.JWTSecretKey) //secure login - jwt  {  to generate token - sign method }
            res.status(200).json({ exisitingUser, token })
        }
        else {
            const newUser = new users({
                username, email, password, profile
            })
            await newUser.save()
            const token = jwt.sign({ userMail: newUser.email, role: newUser.role }, process.env.JWTSecretKey) //secure login - jwt  {  to generate token - sign method }
            res.status(200).json({ exisitingUser: newUser, token })
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

//edit profile
exports.editProfileController = async (req, res) => {
    console.log('Inside Edit profile Controller');
    const { username, password, bio, role, profile } = req.body
    const updatedProfile = req.file ? req.file.filename : profile
    const email = req.payload
    try {
        const editProfile = await users.findOneAndUpdate({ email }, { username, password, bio, role, profile: updatedProfile }, { new: true })
        res.status(200).json(editProfile)
    } catch (error) {
        res.status(500).json(error)
    }
}



//--------------admin------------------

//get all-users
exports.getAllUsersController = async (req, res) => {
    console.log('Inside get All Users Admmin Controller');
    const userMail = req.payload
    try {
        const allUsers = await users.find({ email: { $ne: userMail } })
        res.status(200).json(allUsers)
    } catch (error) {
        res.status(500).json(error)
    }

}

//update admin-profile
exports.updateAdminProfileController = async (req, res) => {
    console.log('Inside Edit profile Controller');
    //get-data
    const { username, password, profile } = req.body
    const updatedProfile = req.file ? req.file.filename : profile
    const email = req.payload
    const role = req.role
    try {
        const updateAdmin = await users.findOneAndUpdate({ email }, { username, password, role, profile: updatedProfile }, { new: true })
        res.status(200).json(updateAdmin)
    } catch (error) {
        res.status(500).json(error)
    }
}
