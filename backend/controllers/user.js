import { User } from "../models/user.model.js";
import { hashPassword } from "../utils/bcrypt.js";
import bcrypt from 'bcryptjs';
import { generateToken } from "../utils/jwt.js";



export const registerUser = async (req, res) => {
    try {

        const { name,email, password } = req.body;
        console.log('Registering user:', name, email);
        const hashedPassword = await hashPassword(password);
        const newUser = new User({
            name: name,
            email: email,
            password: hashedPassword,
        });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
        
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        console.log('User found:', user.email);

        const isPasswordValid = await bcrypt.compare(password, user.password);
        
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
            console.log('testing')
            console.log(user._id)
        const token = generateToken(user._id);
        console.log(token);
        res.status(200).json({ 
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
