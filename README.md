# Project: Phonebook Backend

## Key Concepts Learned:
- **Express Server:** Setting up a web server with Express to handle API requests.
- **RESTful API Design:** Creating endpoints for CRUD operations on phonebook entries.
- **Mongoose Schema & Validation:** Defining a schema for the `Person` model and adding validation rules.
- **Express Middleware:** Using `morgan` for request logging and creating custom middleware for error handling.

## Functionality:
This backend provides a RESTful API for a phonebook application. It supports adding new persons, retrieving all persons, retrieving a single person, deleting a person, and updating a person's phone number. It connects to a MongoDB database to persist the data.

## Technical Highlight:
The server uses a custom middleware created with `morgan` to log HTTP request details, including the request body for POST requests. This provides valuable debugging information during development. Additionally, the Mongoose schema for a `Person` includes built-in validators to ensure that the name and phone number meet specific format and length requirements, enforcing data integrity at the database level.
