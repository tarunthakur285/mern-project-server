const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../model/users");
const secret = "2b64966f-3094-47df-9f20-e344f7f638ef";

const authController = {
  login: async (request, response) => {
    try {
      const { username, password } = request.body;

      const data = await User.findOne({ email: username });
      if (!data) {
        return response.status(401).json({ message: "Invalid username or password" });
      }

      const isMatch = await bcrypt.compare(password, data.password);
      if (!isMatch) {
        return response.status(401).json({ message: "Invalid credentials" });
      }

      const user = {
        id: data._id,
        name: data.name,
        email: data.email,
      };

      const token = jwt.sign(user, secret, { expiresIn: "1h" });

      response.cookie("jwtToken", token, {
        httpOnly: true,
        secure: false,
        path: "/",
      });

      response.json({ user, message: "User authenticated successfully" });
    } catch (error) {
      console.log(error);
      response.status(500).json({ error: "Internal server error" });
    }
  },

  logout: (request, response) => {
    response.clearCookie("jwtToken");
    response.json({ message: "User logged out successfully" });
  },

  isUserLoggedIn: (request, response) => {
    const token = request.cookies.jwtToken;
    if (!token) {
      return response.status(401).json({ message: "Unauthorized access" });
    }

    jwt.verify(token, secret, (error, user) => {
      if (error) {
        return response.status(401).json({ message: "Unauthorized access" });
      } else {
        response.json({ message: "User is logged in", user });
      }
    });
  },

  register: async (request, response) => {
    try {
      const { name, email, password } = request.body;
      const data = await User.findOne({ email: email });
      if (data) {
        return response.status(400).json({ message: "User already exists" });
      }

      const encryptedPassword = await bcrypt.hash(password, 10);
      const user = new User({
        email: email,
        password: encryptedPassword,
        name: name,
      });

      await user.save();
      response.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      return response.status(500).json({ error: "Internal server error" });
    }
  },
};

module.exports = authController;
