const jwt = require("jsonwebtoken")

const jwtMiddleware = (req , res, next) => {
    console.log("Inside JWT Middleware ");
    const token = req.headers.authorization.split(" ")[1]
    console.log(token);

    try {
        const JWTResponse = jwt.verify(token, process.env.JWTSecretKey)
        console.log(JWTResponse);
        req.payload = JWTResponse.userMail
        next()
        
    } catch (error) {
        res.status(500).json("Invalid Token")
        
    }
    
    
}
module.exports = jwtMiddleware