const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
require('dotenv').config();
const { ObjectId } = require('mongodb');

JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const requireAuth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        //console.log('Received token:', token);
        const decoded = jwt.verify(token, JWT_SECRET_KEY);
        //console.log('Decoded token:', decoded);
        const user = await User.findOne({
            _id: decoded.id,
        })
        //console.log('User found:', user);
        if (!user) {
            throw new Error('Unable to login , invalid credentials');
        }
        req.user = user;
        req.token = token;
        next();
    }
    catch (error) { 
        res.status(401).send({ error: error.message});
    }
};

module.exports = requireAuth;