const express = require('express');
const bodyParser = require('body-parser');
const databaseOperations = require('../database/databaseOperations');
const bcrypt = require('bcrypt');

const authenticationRouter = express.Router();
authenticationRouter.use(bodyParser.json());
authenticationRouter.use(bodyParser.urlencoded({ extended: false }));

// Route for user registration
authenticationRouter.post('/register', async (req, res, next) => {
    try {
        // Extract user registration data from request body
        const { username, email, password } = req.body;

        // Hash the password before storing it in the database
        const hashedPassword = await bcrypt.hash(password, 10);

        // Call database operation to register user
        await databaseOperations.registerUser(username, email, hashedPassword);

        // Return success response
        res.status(200).json({ status: 'success', message: 'User registered successfully' });
    } catch (error) {
        // Return error response
        console.error('Error in user registration:', error);
        res.status(500).json({ status: 'error', message: 'Could not register user' });
    }
});

// Route for user login
authenticationRouter.post('/login', async (req, res, next) => {
    try {
        // Extract user login data from request body
        const { email, password } = req.body;

        // Call database operation to authenticate user
        const user = await databaseOperations.authenticateUser(email, password);

        // Check if user exists and password matches
        if (user && user.length > 0) {
            // Return success response with user details
            res.status(200).json({ status: 'success', message: 'User authenticated successfully', user: user[0] });
        } else {
            // Return failure response if authentication fails
            res.status(401).json({ status: 'error', message: 'Invalid email or password' });
        }
    } catch (error) {
        // Return error response
        console.error('Error in user authentication:', error);
        res.status(500).json({ status: 'error', message: 'Could not authenticate user' });
    }
});

module.exports = authenticationRouter;
