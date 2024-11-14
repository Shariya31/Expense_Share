import { TryCatch } from "../middlewares/error.js"
import { Book } from "../models/books.js"
import ErrorHandler from "../utilities/utility_class.js"
export const addNewBook = TryCatch(async(req, res, next)=>{
    const {title, author, description} = req.body

    let book = await Book.findOne({title})

    if(book) return res.status(200).json({
        success: true,
        message: "Book already exists"
    })

    if(!title || !author || !description) return next(new ErrorHandler("Please fill all the fileds", 400))

    const newBook = await Book.create({
        title,
        author,
        description
    })

    return res.status(201).json({
        success: true,
        message: "Book posted successfully",
        newBook

    })
})

export const getAllBooks = TryCatch(async(req, res, next)=>{

    let books = await Book.find({})

    return res.status(201).json({
        success: true,
        message: "Here is list of all books",
        books
    })
})

export const deleteBook = TryCatch(async(req, res)=>{

    const book = await Book.findById(req.params.id);

    if(!book) return next(new ErrorHandler("No book found", 404));

    await Book.deleteOne();

    return res.status(200).json({
        success: true,
        message: "Book deleted"
    })
})