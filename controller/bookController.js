const { json } = require("express");
const books = require("../model/bookModel");

exports.addBookController = async (req , res) => {
    console.log("Inside Book Controller");
    
    const {title , author , noofPages , ImageUrl , price , dPrice , abstract ,publisher , isbn , language , category  } = req.body
 
    
    var uploadImages = []
    req.files.map((item)=> uploadImages.push(item.filename))

    const userMail = req.payload

    console.log(title , author , noofPages , ImageUrl , price , dPrice , abstract ,publisher , isbn , language , category ,uploadImages, userMail );
    
    try {
        const existingBook = await books.findOne({title,userMail})
        if(existingBook){
            res.status(404).json('You have already added the book')
        }
        else{
            const newBook = new books({
                title , author , noofPages , ImageUrl , price , dPrice , 
                abstract ,publisher , isbn , language , 
                category ,uploadImages, userMail
        })
            await newBook.save()
            res.status(200).json(newBook)
        }

        
    } catch (error) {
        res.status(500).json(error)
    }
}

//get home books
exports.getHomeBookCOntroller = async(req,res)=>{
    console.log('Inside Home Book Controller');
    try {
        const homeBooks = await books.find().sort({_id: -1}).limit(4)
        res.status(200).json(homeBooks)
    } catch (error) {
        res.status(404).json(error)
    }
}


//get all books
exports.getAllBooksController = async(req,res)=>{
    console.log('Inside All Book Controller');
    const searchKey = req.query.search
    const userMail = req.payload
    const query = {
        title : {$regex : searchKey, $options : "i"}
    , userMail : {$ne : userMail}
    }
    try {
        const allBooks = await books.find(query)
        res.status(200).json(allBooks)
    } catch (error) {
        res.status(404).json(error)
    }
}

//view book
exports.getBookController = async (req,res)=>{
    console.log('Inside A Book Controller');
    const {id} = req.params //in node req.params instead of useParams in react to get id
    try{
        const getBook = await books.findById({_id : id})
        res.status(200).json(getBook)
    }
    catch(error){
        res.status(404).json(error)
    }
}

// book status
exports.getStatusBookController = async(req,res)=>{
    console.log('Inside Status Book Controller');
    const userMail = req.payload
    try {
        const statusBook = await books.find({userMail})
        res.status(200).json(statusBook)
    } catch (error) {
        res.status(500).json(error)
    }
}

//delete

exports.deleteUserAddedBookController = async(req,res)=>{
    console.log('inside delete book controller');
    const {id} = req.params
    try {
        await books.findByIdAndDelete({_id : id})
        res.status(200).json("Book Deleted Succesfully")
    } catch (error) {
        res.status(500).json(error)
        
    }
    
}

//purchase history
exports.purchaseHistoryController = async(req,res)=>{
    console.log('Inside Purchase History Controller');
    const userMail = req.payload
    try {
        const purchaseHistory = await books.find({boughtby : userMail})
        res.status(200).json(purchaseHistory)
        
    } catch (error) {
        console.log(error);
        
    }
    
}


