const mysql = require('mysql');

// Create a MySQL connection pool
const pool = mysql.createPool({
    connectionLimit: 10,
    password: 'your_mysql_password',
    user: 'your_mysql_username',
    host: 'your_mysql_host',
    port: 'your_mysql_port', // Default: 3306
    database: 'your_database_name',
    insecureAuth: true // If needed, based on MySQL server configuration
});

let databaseOperations = {};

// Function to register a new user
databaseOperations.registerUser = (username, email, password) => {
    return new Promise((resolve, reject) => {
        pool.query("INSERT INTO users (username, email, password) VALUES (?, ?, ?)", [username, email, password], (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        });
    });
};

// Function to authenticate a user
databaseOperations.authenticateUser = (email, password) => {
    return new Promise((resolve, reject) => {
        pool.query("SELECT * FROM users WHERE email = ? AND password = ?", [email, password], (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        });
    });
};

// Function to add a new train
databaseOperations.addTrain = (source, destination, totalSeats) => {
    return new Promise((resolve, reject) => {
        pool.query("INSERT INTO trains (source, destination, total_seats) VALUES (?, ?, ?)", [source, destination, totalSeats], (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        });
    });
};

// Function to get trains between source and destination with seat availability
databaseOperations.getTrains = (source, destination) => {
    return new Promise((resolve, reject) => {
        pool.query("SELECT * FROM trains WHERE source = ? AND destination = ?", [source, destination], (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        });
    });
};

// Function to book a seat on a train
databaseOperations.bookSeat = (trainId, userId) => {
    return new Promise((resolve, reject) => {
        pool.query("INSERT INTO bookings (train_id, user_id) VALUES (?, ?)", [trainId, userId], (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        });
    });
};

module.exports = databaseOperations;

