const jwt = require("jsonwebtoken");

const authController = {
    secret: "2b64966f-3094-47df-9f20-e344f7f638ef",

    login: (request, response) => {
        const { username, password } = request.body;

        if (username === "admin" && password === "admin") {
            const user = {
                name: "Tarun",
                email: "tarun@thakur.com",
            };

            const token = jwt.sign(user, authController.secret, { expiresIn: "1h" });
            response.cookie("jwtToken", token, { 
                httpOnly: true,
                secure: true,
                domain: "localhost",
                path: '/'
            });
            response.json({ user: user, message: 'user authenticated successfully' });
        } else {
            response.status(401).json({ message: "invalid credentials" });
        }
    },

    logout: (request, response) => {
        response.clearCookie('jwtToken');
        response.json({ message: "User logged out successfully" });
    },

    isUserLoggedIn: (request, response) => {
        const token = request.cookies.jwtToken;
        if (!token) {
            return response.status(401).json({ message: "Unauthorized access" });
        }
        jwt.verify(token, authController.secret, (error, user) => {
            if (error) {
                return response.status(401).json({ message: "Unauthorized access" });
            } else {
                response.json({ message: "User is logged in", user: user });
            }
        });
    },
};

module.exports = authController;
