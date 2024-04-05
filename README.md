# Railway-Management-System-API-
The train management, user authentication, and reservation of seats are among the features offered by this API. The platform facilitates user registration, login, train reservation, and viewing of available trains between the source and destination.
# Installation
1. Clone this repository.
2. Install dependencies using `npm install`.
3. Configure your MySQL database details in the `databaseOperations.js` file.
4. Start the server using `npm start`.
# Project Structure
databaseOperations.js      # Database operations for user authentication and train management
authenticationRouter.js    # Routes for user authentication
listRouter.js              # Routes for train management
app.js                     # Main application file
README.md                  # Project documentation
package.json               # Project dependencies and scripts
# Dependencies
express: Web server framework for Node.js
bcrypt: Library for password hashing and verification
mysql: MySQL database driver for Node.js
