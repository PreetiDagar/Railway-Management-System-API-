const express = require('express');
const bodyParser = require('body-parser');
const databaseOperations = require('../database/databaseOperations');

const listRouter = express.Router();
listRouter.use(bodyParser.json());
listRouter.use(bodyParser.urlencoded({ extended: false }));

// Route for getting trains between source and destination
listRouter.post('/get_trains', async (req, res, next) => {
    try {
        // Extract source and destination from request body
        const { source, destination } = req.body;

        // Call database operation to get trains between source and destination
        const trains = await databaseOperations.getTrains(source, destination);

        // Return success response with list of trains
        res.status(200).json({ status: 'success', message: 'Trains fetched successfully', trains });
    } catch (error) {
        // Return error response
        console.error('Error in fetching trains:', error);
        res.status(500).json({ status: 'error', message: 'Could not fetch trains' });
    }
});

// Route for booking a seat on a train
listRouter.post('/book_seat', async (req, res, next) => {
    try {
        // Extract train ID and user ID from request body
        const { trainId, userId } = req.body;

        // Call database operation to book a seat on the train
        await databaseOperations.bookSeat(trainId, userId);

        // Return success response
        res.status(200).json({ status: 'success', message: 'Seat booked successfully' });
    } catch (error) {
        // Return error response
        console.error('Error in booking seat:', error);
        res.status(500).json({ status: 'error', message: 'Could not book seat' });
    }
});

module.exports = listRouter;
