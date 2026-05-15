const Food = require('../models/food');


exports.addFood = async (req, res) => {
    try {
        const { foodName, foodType, quantity, expiryTime, address } = req.body;
        if (!foodName || !foodType || !quantity || !expiryTime || !address) {
            return res.status(400).json({ success: false, msg: "Please fill in all required fields." });
        }

        const newFood = new Food({
            donor: req.user._id, 
            foodName,
            foodType,
            quantity,
            expiryTime,
            address,
            postType: 'Donation' 
        });

        await newFood.save();
        res.status(201).json({ success: true, msg: "Food Donation Posted Successfully!" });
    } catch (err) {
        res.status(500).json({ success: false, error: "Server Error" });
    }
};

exports.getAllFood = async (req, res) => {
    try {
      
        const foods = await Food.find({ status: 'Available', postType: 'Donation' })
                                .populate('donor', 'username phone');
        res.status(200).json({ success: true, foods });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};


exports.addRequest = async (req, res) => {
    try {
        const { name, contact, quantity, location } = req.body;
        const newRequest = new Food({
            donor: req.user._id, 
            ngoName: name,
            foodName: "Food Request", 
            foodType: "Veg", 
            quantity,
            contact: contact|| req.user.phone,
            address: location,
            expiryTime: "N/A",
            postType: 'Request',
            status: 'Available' 
        });

        await newRequest.save();
        res.status(201).json({ success: true, msg: "NGO Request Posted Successfully!" });
    } catch (err) {
        res.status(500).json({ success: false, msg: "Server Error" });
    }
};


exports.getAllRequests = async (req, res) => {
    try {
        const requests = await Food.find({ postType: 'Request' }).sort({ createdAt: -1 });
        res.status(200).json({ success: true, requests });
    } catch (err) {
        res.status(500).json({ success: false, msg: "Server Error" });
    }
};


exports.acceptFood = async (req, res) => {
    try {
        const foodId = req.params.id; 
        const food = await Food.findById(foodId);

        if (!food || food.status !== 'Available') {
            return res.status(400).json({ success: false, msg: "Already accepted or not found."});
        }

        food.status = 'Accepted';
        food.acceptedBy = req.user._id; 
        
        await food.save();
        res.status(200).json({ success: true, msg: "Food accepted successfully!" });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};


exports.getMyDonations = async (req, res) => {
    try {
        const donations = await Food.find({ donor: req.user._id, postType: 'Donation' });
        res.status(200).json({ success: true, donations });
    } catch (err) {
        res.status(500).json({ success: false, msg: "Server Error" });
    }
};

//NGO History
exports.getMyAcceptedFood = async (req, res) => {
    try {
        const accepted = await Food.find({ acceptedBy: req.user._id })
                                    .populate('donor', 'username phone'); 
        res.status(200).json({ success: true, accepted });
    } catch (err) {
        res.status(500).json({ success: false, msg: "Server Error" });
    }
};