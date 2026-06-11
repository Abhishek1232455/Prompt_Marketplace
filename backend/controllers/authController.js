const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const User = require('../models/userModel.js')

const signupController = async (req, res) => {
    try {

        const exisitingUser = await User.findOne({ email: req.body.email });
        //validation
        if (exisitingUser) {
            return res.status(200).send({
                success: false,
                message: "User ALready exists",
            });
        }
        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashedPassword;

        //reset data
        const user = new User(req.body);
        await user.save();
        return res.status(201).send({
            success: true,
            message: "User Registerd Successfully",
            user,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error in Signup API",
            error,
        });
    }
};

const loginController = async (req, res) => {
    try {
        // console.log(req.body);
        const existingUser = await User.findOne({ email: req.body.email });
        if (!existingUser) {
            return res.status(404).send({
                success: false,
                message: "Invalid Credentials",
            });
        }
        //compare password
        const comparePassword = await bcrypt.compare(
            req.body.password,
            existingUser.password
        );
        if (!comparePassword) {
            return res.status(500).send({
                success: false,
                message: "Wrong Pasword !",
            });
        }
        const token = jwt.sign({ userId: existingUser._id }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });


        //user without user password 
        const user = {
            _id: existingUser._id,
            firstName: existingUser.firstName,
            lastName: existingUser.lastName,
            email: existingUser.email,
            prompts: existingUser.prompts,
            role: existingUser.role,
            userCredits: existingUser.userCredits 
        }

        return res.status(200).send({
            success: true,
            message: "Login Successfully",
            token,
            user,
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error In Login API",
            error,
        });
    }
};


const currentUserController = async (req, res) => {
    try {
        // console.log(req.body);
        const existingUser = await User.findOne({ _id: req.body.userId });

        const user = {
            _id: existingUser._id,
            firstName: existingUser.firstName,
            lastName: existingUser.lastName,
            email: existingUser.email,
            prompts: existingUser.prompts,
            role: existingUser.role,
            userCredits: existingUser.userCredits 
        }
        return res.status(200).send({
            success: true,
            message: "User Fetched Successfully",
            user,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "error in getting current user",
            error,
        });
    }
};

module.exports = { signupController, loginController, currentUserController };