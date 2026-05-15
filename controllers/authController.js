const User = require('../models/user');

exports.register = async (req, res) => {
    try {
        const { name, email, password, role, phone, address } = req.body;

        if (!name || !email || !password || !role) {
            return res.status(400).json({ success: false, msg: " Enter your details to continue." });
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ success: false, msg: "User already exists" });
        }

        const newUser = new User({
            username: name,
            email,
            password, 
            role,
            phone,
            address
        });

       
        await newUser.save();
        
        return res.status(201).json({ success: true, msg: "Registration Successful!" });

    } catch (err) {
        
        console.log("CRITICAL ERROR TYPE:", typeof next); 
        console.error("ACTUAL ERROR:", err.message);
        return res.status(500).json({ success: false, error: err.message });
    }
};