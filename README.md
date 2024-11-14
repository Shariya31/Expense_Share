Get All Books

Method: GET
Endpoint: /books
Description: Retrieves a list of all books.
URL: https://your-backend-url.com/books
Add a Book

Method: POST
Endpoint: /books
Description: Adds a new book to the list.
URL: https://your-backend-url.com/books
Body (JSON):
json
Copy code
{
  "title": "Sample Book Title",
  "author": "Sample Author",
  "description": "Sample description of the book."
}


Delete a Book

Method: DELETE
Endpoint: /books/:id
Description: Deletes a book by ID.
URL: https://your-backend-url.com/books/:id
Replace :id with the specific book ID you want to delete.