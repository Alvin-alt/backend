import { User} from "../models/user.model.js";

const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        //basic validation
        if (!username || !email || !password) {
            return res.status(400).json({ message: "Please provide all required fields" });
        }

        // Check if the user already exists     
        const existingUser = await User.findOne({ $or: [{ email: email.toLowerCase() }, { username }] });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Create a new user
        const user = await User.create({ username, email: email.toLowerCase(), password });
        res.status(201).json({ message: "User created successfully", user: { userId: user._id, username: user.username, email: user.email } });


    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Server error" });
    }
};
const loginUser = async (req, res) => {
    try {
        // Check if the user exists
        const { email, password } = req.body;

        // Basic validation
        if (!email || !password) {
            return res.status(400).json({ message: "Please provide both email and password" });
        }


        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        
        
        // Compare the password with the hashed password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // If everything is fine, send a success response
        res.status(200).json({ message: "Login successful", user: { userId: user._id, username: user.username, email: user.email } });

    } catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({ message: "Server error" });
    }
};
const logoutUser = async (req, res) => {
    try {
        const { email} = req.body;  
         const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        // Here you can implement the logic to handle user logout, such as clearing session data or tokens.
        // For example, if you're using JWT, you might want to invalidate the token on the client side.

        res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        console.error("Error logging out user:", error);
        res.status(500).json({ message: "Server error" });
    }
};

export {
     registerUser ,
     loginUser,
     logoutUser
    };    