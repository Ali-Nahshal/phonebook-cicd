# Project: Phonebook Frontend

## Key Concepts Learned:
- **Controlled Forms:** Managing form inputs using React state to handle user input for adding new contacts.
- **Data Fetching with `axios`:** Communicating with a server to perform CRUD (Create, Read, Update, Delete) operations.
- **Filtering Lists:** Implementing a client-side search feature to filter the displayed phonebook entries.

## Functionality:
This application allows users to manage a phonebook. Users can add new contacts, delete existing ones, and update phone numbers for existing contacts. The application also includes a search feature to filter the list and provides notifications for successful operations or errors.

## Technical Highlight:
The application effectively handles synchronization with the server. For instance, when a user tries to update a contact that has already been deleted from the server, the frontend catches the error, displays an appropriate notification, and updates the UI to remove the stale entry. This demonstrates robust error handling and state synchronization in a real-world scenario.
