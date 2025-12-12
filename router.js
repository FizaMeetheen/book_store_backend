const express = require("express")
const { registerController, loginController, editProfileController, getAllUsersController, updateAdminProfileController, googleLoginController } = require("./controller/userController")
const { addBookController, getHomeBookCOntroller,  getAllBooksController, getBookController, getStatusBookController, deleteUserAddedBookController, purchaseHistoryController, getAllAdminBooksController, updateBookStatusController, BookpaymentController } = require("./controller/bookController")
const jwtMiddleware = require("./middleware/jwtMiddleware")
const multerConfig = require("./middleware/imgMulterMiddleware")
const adminJwtMiddleware = require("./middleware/adminJwtMiddleware")

const router = express.Router()

//register
router.post("/register" , registerController)

//login
router.post("/login",loginController)

//google-login
router.post("/google-login",googleLoginController)

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

//purchase history
router.get('/purchase-history',jwtMiddleware, purchaseHistoryController)

//edit profile
router.put('/edit-profile',jwtMiddleware,multerConfig.single("profile"),editProfileController)

//--------------------admin----------------------

//get all admin-books
router.get("/get-allBooks",adminJwtMiddleware,getAllAdminBooksController)

//updateBookStatus - admin
router.put("/update-book/:id",adminJwtMiddleware,updateBookStatusController)

//get all-users -admin
router.get("/all-users",adminJwtMiddleware,getAllUsersController)

//update admin-profile
router.put("/update-admin-profile",adminJwtMiddleware,multerConfig.single("profile"),updateAdminProfileController)

//mode-payment
router.put("/payment-mode",jwtMiddleware,BookpaymentController)

module.exports = router