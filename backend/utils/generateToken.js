import jwt from "jsonwebtoken"

export const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "15d" });

    res.cookie("jwt", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000,   // 15 days
        httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
        sameSite: "strict",  // CSRF protection (cross-site request forgery)
        secure: process.env.NODE_ENV !== "development" // Ensures the cookie is only sent over HTTPS
    })
}