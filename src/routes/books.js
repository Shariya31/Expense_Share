import express from 'express'
import { addNewBook, deleteBook, getAllBooks } from '../controllers/books.js';

const app = express.Router();

// http://localhost:6600/api/v1/books
app.post("/books", addNewBook);

// http://localhost:6600/api/v1/books
app.get('/books', getAllBooks)

// http://localhost:6600/api/v1/books/id
app.delete('/books/:id', deleteBook)

export default app