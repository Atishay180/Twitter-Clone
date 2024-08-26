import { User } from "../models/user.model.js";
import bcrypt from "bcrypt"
import { generateTokenAndSetCookie } from "../utils/generateToken.js";


const signup = async (req, res) => {
    try {
        const { fullName, username, email, password } = req.body

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            return res
                .status(400)
                .json({ error: "Invalid email format" })
        }

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res
                .status(400)
                .json({ error: "Username is already taken" })
        }

        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res
                .status(400)
                .json({ error: "Email is already taken" })
        }

        if (password.length < 6) {
            return res
                .status(400)
                .json({ error: "Password must be at least 6 characters long" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullName,
            username,
            email,
            password: hashedPassword
        })

        if (newUser) {
            await newUser.save()
            generateTokenAndSetCookie(newUser._id, res)

            return res
                .status(201)
                .json({
                    _id: newUser._id,
                    fullName: newUser.fullName,
                    username: newUser.username,
                    email: newUser.email,
                    followers: newUser.followers,
                    following: newUser.following,
                    profileImg: newUser.profileImg,
                    coverImg: newUser.coverImg
                })
        } else {
            return res
                .status(400)
                .json({ error: "Invalid user data" })
        }

    } catch (error) {
        console.log("Error in signup: ", error.message);
        return res
            .status(500)
            .json({ error: "Internal Server Error" })
    }
}

const login = async (req, res) => {
    try {
        const { username, password } = req.body

        const user = await User.findOne({ username });
        if (!user) {
            return res
                .status(400)
                .json({ error: "Invalid username" })
        }
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

        if (!isPasswordCorrect) {
            return res
                .status(400)
                .json({ error: "Invalid password" })
        }

        generateTokenAndSetCookie(user._id, res);

        return res
            .status(201)
            .json({
                _id: user._id,
                fullName: user.fullName,
                username: user.username,
                email: user.email,
                followers: user.followers,
                following: user.following,
                profileImg: user.profileImg,
                coverImg: user.coverImg
            })
    } catch (error) {
        console.error("Error in login:", error.message);
        return res
            .status(500)
            .json({ error: "Internal Server Error" });
    }
}

const logout = async (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });   //(name, value, option => remove the cookie immediately) 
        return res
            .status(200)
            .json({ message: "Logged out successfully" });
    } catch (error) {
        console.error("Error in logout:", error.message);
        return res
            .status(500)
            .json({ error: "Internal Server Error" });
    }
}

const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password")
        return res
            .status(200)
            .json(user);
    } catch (error) {
        console.error("Error in getMe:", error.message);
        return res
            .status(500)
            .json({ error: "Internal Server Error" });
    }
}

export { signup, login, logout, getMe }