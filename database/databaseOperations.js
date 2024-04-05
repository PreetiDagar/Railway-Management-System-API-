const mysql = require('mysql');

// Establish a pool of MySQL connections
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

// feature for adding new users
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

// Authentication function for users
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

// Ability to include a new train
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

// The ability to obtain trains with available seats between a source and a destination
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

// Ability to reserve a seat on a train
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

