const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const authController = require('../controllers/authController');

// --- 1. REGISTER ROUTE ---

router.post('/register', authController.register);

// --- 2. LOGIN ROUTE ---
router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) return res.status(500).json({ success: false, error: err.message });
        if (!user) return res.status(400).json({ success: false, msg: info.message });

        req.logIn(user, (err) => {
            if (err) return res.status(500).json({ success: false, error: err.message });

            
            const token = jwt.sign(
                { id: user._id }, 
                process.env.JWT_SECRET, 
                { expiresIn: '1d' }
              );

           
            return res.status(200).json({ 
                success: true,
                token: token, 
                msg: "Login Successful!", 
                user: { id: user._id, name: user.username, role: user.role } 
            });
        });
    })(req, res, next);
});

// --- 3. LOGOUT ROUTE ---
router.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) return res.status(500).json({ msg: "Logout failed" });
        res.status(200).json({ msg: "Logged out successfully" });
    });
});

module.exports = router;