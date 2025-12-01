const express = require("express")
const { registerController, loginController } = require("./controller/userController")
const { addBookController, getHomeBookCOntroller,  getAllBooksController, getBookController, getStatusBookController, deleteUserAddedBookController } = require("./controller/bookController")
const jwtMiddleware = require("./middleware/jwtMiddleware")
const multerConfig = require("./middleware/imgMulterMiddleware")

const router = express.Router()

//register
router.post("/register" , registerController)

//login
router.post("/login",loginController)

//get book
router.get("/home-books",getHomeBookCOntroller)

//add-book
router.post("/add-book" , jwtMiddleware , multerConfig.array("uploadImages",3), addBookController)

// get all books
router.get("/All-books",jwtMiddleware,getAllBooksController)

//get a book
router.get("/viewBook/:id",jwtMiddleware,getBookController)

//status book
router.get('/userbooks',jwtMiddleware,getStatusBookController)

//delete book
router.delete('/delete-book/:id', deleteUserAddedBookController)

module.exports = router