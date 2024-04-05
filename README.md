# Railway-Management-System-API-
The train management, user authentication, and reservation of seats are among the features offered by this API. The platform facilitates user registration, login, train reservation, and viewing of available trains between the source and destination.
# Installation
1. Clone this repository.
2. Install dependencies using `npm install`.
3. Configure your MySQL database details in the `databaseOperations.js` file.
4. Start the server using `npm start`.
# Project Structure
1. databaseOperations.js      # Database operations for user authentication and train management
2. authenticationRouter.js    # Routes for user authentication
3. listRouter.js              # Routes for train management
4. app.js                     # Main application file
# Dependencies
1. express: Web server framework for Node.js
2. bcrypt: Library for password hashing and verification
3. mysql: MySQL database driver for Node.js
