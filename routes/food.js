const express = require('express');
const router = express.Router();
const foodController = require('../controllers/foodController');
const jwt = require('jsonwebtoken'); 
const isAuthenticated = (req, res, next) => {
    const authHeader = req.header('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ success: false, msg: "Session expired! Please login again." });
    }

    const token = authHeader.split(' ')[1];

    try {
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { _id: decoded.id }; 
        next();
    } catch (err) {
        return res.status(401).json({ success: false, msg: "Invalid Token. Please login again." });
    }
};

// --- ROUTES ---

router.post('/add', isAuthenticated, foodController.addFood);


router.post('/request/add', isAuthenticated, foodController.addRequest);

router.get('/all-requests', foodController.getAllRequests);

router.put('/accept/:id', isAuthenticated, foodController.acceptFood);


router.get('/available', foodController.getAllFood);

router.get('/my-donations', isAuthenticated, foodController.getMyDonations);


router.get('/my-accepted-food', isAuthenticated, foodController.getMyAcceptedFood);

module.exports = router;









