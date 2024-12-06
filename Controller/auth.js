import users from '../models/auth.js';
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken"
export const signup = async (req, res) => {
    const { name, email, password } = req.body;
    
    if (!name || !email || !password) {
        return res.status(400).json({ message: "Name, email, and password are required" });
    }

    try {
        const existingUser = await users.findOne({ email });
        if (existingUser) {
            return res.status(404).json({ message: "User already exists" });
        }

        const hashedpassword = await bcrypt.hash(password, 12);
        const newuser = await users.create({
            name,
            email,
            password: hashedpassword
        });
        const token = jwt.sign({
            email:newuser.email,id:newuser._id
        },process.env.JWT_SECRET,{expiresIn:"1h"}
        )
        res.status(200).json({ result: newuser , token});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong..." });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    try {
        const existinguser = await users.findOne({ email });
        if (!existinguser) {
            return res.status(400).json({ message: "User does not exist" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, existinguser.password);
        if (!isPasswordCorrect) {
            res.status(400).json({ message: "Invalid credentials" });
            return
        }
        const token = jwt.sign({
            email:existinguser.email,id:existinguser._id
        },process.env.JWT_SECRET,{expiresIn:"1h"}
        )
        
        res.status(200).json({ result: existinguser,token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong..." });
    }
};
