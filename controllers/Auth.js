const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

function createToken(id) {
    return jwt.sign({ id }, JWT_SECRET_KEY, { expiresIn: 60 * 60 * 24 });
}
class Auth {
    static async signUp(req, res) {
        const { email, password } = req.body;
        try {
            const user = await User.create({ email, password});
            const token = createToken(user._id);
            res.cookie('jwt', token);
            res.status(201).json({user: user._id});
        } catch (error) {
            if (error.code === 11000) {
                console.log('email already exists');
            }
            else {
                console.log(error.message);
                res.status(400);
            }
        }
    }
    static async signIn(req, res) {
        const { email , password } = req.body;
        try {
            const user = await User.findOne({ email });
            if (!user) {
                res.status(400).json('user does no exist');
            }
            const auth = await bcrypt.compare(password, user.password);
            if (auth) {
                const token = createToken(user._id);
                res.cookie('jwt', token);
                res.status(200).json({ user: user._id});
            }
        } catch (error) {
            console.log(error.message);
            res.status(400);
        }

    }
    static async signOut(req, res) {
        res.cookie('jwt', " ", { maxAge: 1 });
        // res.redirect('/')
    }
}
module.exports = Auth;
