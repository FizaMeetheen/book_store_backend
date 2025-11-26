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
    try {
        const allBooks = await books.find()
        res.status(200).json(allBooks)
    } catch (error) {
        res.status(404).json(error)
    }
}