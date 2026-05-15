const mongoose = require('mongoose');

const FoodSchema = new mongoose.Schema({
    donor: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
 
    acceptedBy: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        default: null 
    },
    postType: { 
        type: String, 
        enum: ['Donation', 'Request'], 
        default: 'Donation' 
    },
    ngoName: { 
        type: String 
    },
    foodName: { 
        type: String,
        required: true
     },
    foodType: {
         type: String, 
         enum: ['Veg', 'Non-Veg'],
          required: true 
    },
    quantity: { 
        type: String,
         required: true 
    },
    expiryTime: {
         type: String,
          required: true
     },
    address: { 
        type: String,
         required: true
    },
    contact: {
        type: String,
        default: ""
    },
    status: { 
        type: String, 
        enum: ['Available', 'Accepted', 'Picked'], 
        default: 'Available' 
    }
}, { timestamps: true });

module.exports = mongoose.model('Food', FoodSchema);