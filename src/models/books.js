import mongoose from "mongoose";

const booksSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Please provide the book title"]
        },
        author: {
            type: String,
            required: [true, "Please provide the author's name of the book"]
        },
        description: {
            type: String,
            required: [true, "Please provide description"]
        },
    },
    {
        timestamps: true,
    }
)

export const Book = mongoose.model("Book", booksSchema)